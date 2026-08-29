#!/usr/bin/env python3
"""Upsert GTM CE + GA4 Event for demo funnel (X|CMS + service-path).

Contenedor: GTM-PM5LBQRP · cuenta 6365610691 · container 258073653
GA4: G-G7JXJKGCDV

No es conversión Ads. generate_lead / book_call siguen siendo los key events.

Auth: ADC con scope tagmanager.edit.containers (+ publish si --publish).
  gcloud auth application-default login \\
    --scopes=https://www.googleapis.com/auth/tagmanager.edit.containers,https://www.googleapis.com/auth/tagmanager.publish
"""
from __future__ import annotations

import argparse
import json
import sys
import urllib.error
import urllib.parse
import urllib.request

ACCOUNT = "6365610691"
CONTAINER = "258073653"
GA4_ID = "G-G7JXJKGCDV"
TRIGGER_NAME = "CE · demo_funnel"
TAG_NAME = "GA4 · demo_funnel"
EVENT_REGEX = r"^(hero_x_cms_open|demo_x_cms_.+|demo_path_.+)$"
DLV_KEYS = (
    "event",
    "path_id",
    "package_id",
    "surface",
    "cta",
    "reason",
    "duration_sec",
    "product",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
)


def token() -> str:
    import google.auth
    from google.auth.transport.requests import Request

    creds, _ = google.auth.default(
        scopes=[
            "https://www.googleapis.com/auth/tagmanager.edit.containers",
            "https://www.googleapis.com/auth/tagmanager.publish",
        ]
    )
    creds.refresh(Request())
    return creds.token


def api(method: str, path: str, tok: str, body: dict | None = None, query: dict | None = None):
    url = "https://tagmanager.googleapis.com/tagmanager/v2" + path
    if query:
        url += "?" + urllib.parse.urlencode(query)
    data = None if body is None else json.dumps(body).encode()
    req = urllib.request.Request(
        url,
        data=data,
        method=method,
        headers={
            "Authorization": f"Bearer {tok}",
            "Content-Type": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as res:
            raw = res.read()
            return json.loads(raw) if raw else {}
    except urllib.error.HTTPError as e:
        err = e.read().decode("utf-8", "replace")
        raise SystemExit(f"{method} {path} HTTP {e.code}\n{err}") from e


def by_name(items: list, name: str) -> dict | None:
    for it in items:
        if it.get("name") == name:
            return it
    return None


def dlv_body(key: str) -> dict:
    return {
        "name": f"DLV · {key}",
        "type": "v",
        "parameter": [
            {"type": "INTEGER", "key": "dataLayerVersion", "value": "2"},
            {"type": "BOOLEAN", "key": "setDefaultValue", "value": "false"},
            {"type": "TEMPLATE", "key": "name", "value": key},
        ],
    }


def trigger_body() -> dict:
    return {
        "name": TRIGGER_NAME,
        "type": "CUSTOM_EVENT",
        "customEventFilter": [
            {
                "type": "MATCH_REGEX",
                "parameter": [
                    {"type": "TEMPLATE", "key": "arg0", "value": "{{_event}}"},
                    {"type": "TEMPLATE", "key": "arg1", "value": EVENT_REGEX},
                    {"type": "BOOLEAN", "key": "negate", "value": "false"},
                ],
            }
        ],
    }


def param_map(name: str, value: str) -> dict:
    return {
        "type": "MAP",
        "map": [
            {"type": "TEMPLATE", "key": "name", "value": name},
            {"type": "TEMPLATE", "key": "value", "value": value},
        ],
    }


def tag_body(trigger_id: str) -> dict:
    event_params = [
        param_map(k, f"{{{{DLV · {k}}}}}")
        for k in DLV_KEYS
        if k != "event"
    ]
    return {
        "name": TAG_NAME,
        "type": "gaawe",
        "tagFiringOption": "ONCE_PER_EVENT",
        "firingTriggerId": [trigger_id],
        "parameter": [
            {"type": "BOOLEAN", "key": "sendEcommerceData", "value": "false"},
            {"type": "TEMPLATE", "key": "eventName", "value": "{{DLV · event}}"},
            {"type": "TEMPLATE", "key": "measurementIdOverride", "value": GA4_ID},
            {"type": "LIST", "key": "eventParameters", "list": event_params},
        ],
    }


def upsert(path: str, tok: str, existing: dict | None, body: dict) -> dict:
    if existing:
        body = {**existing, **body, "path": existing["path"]}
        return api("PUT", "/" + existing["path"], tok, body)
    return api("POST", path, tok, body)


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--publish", action="store_true", help="Publicar workspace (versión demo funnel)")
    args = p.parse_args()

    tok = token()
    ws_list = api("GET", f"/accounts/{ACCOUNT}/containers/{CONTAINER}/workspaces", tok)
    workspaces = ws_list.get("workspace", [])
    if not workspaces:
        raise SystemExit("No workspace in container")
    ws = workspaces[0]
    ws_path = "/" + ws["path"]
    print(f"workspace={ws.get('name')} path={ws['path']}")

    vars_list = api("GET", f"{ws_path}/variables", tok).get("variable", [])
    for key in DLV_KEYS:
        name = f"DLV · {key}"
        got = upsert(f"{ws_path}/variables", tok, by_name(vars_list, name), dlv_body(key))
        print(f"variable {got.get('name')} id={got.get('variableId')}")

    trigs = api("GET", f"{ws_path}/triggers", tok).get("trigger", [])
    trig = upsert(f"{ws_path}/triggers", tok, by_name(trigs, TRIGGER_NAME), trigger_body())
    print(f"trigger {trig.get('name')} id={trig.get('triggerId')}")

    tags = api("GET", f"{ws_path}/tags", tok).get("tag", [])
    tag = upsert(f"{ws_path}/tags", tok, by_name(tags, TAG_NAME), tag_body(trig["triggerId"]))
    print(f"tag {tag.get('name')} id={tag.get('tagId')} firing={tag.get('firingTriggerId')}")

    if args.publish:
        pub = api(
            "POST",
            f"{ws_path}:create_version",
            tok,
            {
                "name": "v5 demo funnel",
                "notes": "GA4 Event demo_funnel (hero_x_cms_open, demo_x_cms_*, demo_path_*). No key event. generate_lead/book_call intactos.",
            },
        )
        ver = pub.get("containerVersion") or pub
        ver_id = ver.get("containerVersionId") or ver.get("path")
        print(f"version created {ver_id}")
        live = api(
            "POST",
            f"/accounts/{ACCOUNT}/containers/{CONTAINER}/versions/{ver.get('containerVersionId')}:publish",
            tok,
            {},
        )
        print("published", json.dumps(live, indent=2)[:1500])
    else:
        print("workspace dirty — Preview puede probar. --publish para live.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
