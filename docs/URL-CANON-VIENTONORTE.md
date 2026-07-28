# URL canon Viento Norte

**Canon:** `https://vientonorte.io/` (sin `/mi-portafolio/`)

| Antes | Ahora |
|-------|--------|
| `vientonorte.io/mi-portafolio/#/consultoria` | `vientonorte.io/#/consultoria` |
| `vientonorte.io/mi-portafolio/` | `vientonorte.io/` |
| Project Pages subpath | SPA en root del hub + redirect legacy |

## Legacy

`/mi-portafolio/` → redirect a `/` preservando hash.

## Ops

`/ops/` se empaqueta en el deploy desde `vientonorte.github.io/ops`.
