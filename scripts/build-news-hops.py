#!/usr/bin/env python3
"""DEPRECATED 2026-09-09: /s/news and /news removed from FO.

Do not regenerate crawler hops. LinkedIn weekly CTA is /s/consultoria with UTMs.
Newsletter covers live in vault SEM/news-covers (attached on LinkedIn), not a site page.
This script is a no-op so nothing regenerates public/s/news.
"""
from __future__ import annotations


def main() -> None:
    print("DEPRECATED 2026-09-09: /s/news removed; build-news-hops is a no-op")
    raise SystemExit(0)


if __name__ == "__main__":
    main()
