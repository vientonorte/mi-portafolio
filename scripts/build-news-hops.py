#!/usr/bin/env python3
"""DEPRECATED 2026-09-09: the news crawler hops were removed from FO.

Do not regenerate crawler hops. LinkedIn weekly CTA is /servicios/ with UTMs.
Newsletter covers live in vault SEM/news-covers (attached on LinkedIn), not a site page.
This script is a no-op so nothing regenerates the news hops.
"""
from __future__ import annotations


def main() -> None:
    print("DEPRECATED 2026-09-09: news hops removed; build-news-hops is a no-op")
    raise SystemExit(0)


if __name__ == "__main__":
    main()
