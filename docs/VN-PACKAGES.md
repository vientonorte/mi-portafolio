# @vientonorte packages en mi-portafolio

Dependencias (GitHub Packages):

```json
"@vientonorte/a11y": "0.1.1",
"@vientonorte/security": "0.1.1",
"@vientonorte/tokens": "0.2.0",
"@vientonorte/ui": "0.3.2"
```

## Local

```bash
export NODE_AUTH_TOKEN=ghp_xxx   # PAT con read:packages
# o token en ~/.npmrc
npm install
```

`.npmrc` del repo (gitignored) usa `${NODE_AUTH_TOKEN}`. Ver `.npmrc.example`.

## CI

- Secret `VN_PACKAGES_TOKEN` en el repo
- `permissions.packages: read`
- `setup-node` con `registry-url` + `scope: @vientonorte`
- `npm ci` con `NODE_AUTH_TOKEN`

## DS visual

https://dot-wool-76997229.figma.site

## Publish monorepo

https://github.com/vientonorte/vientonorte-core/blob/main/docs/publish-packages.md
