# @vientonorte/* · core GitHub Packages

**Registry canónico:** https://github.com/vientonorte?tab=packages  
**Monorepo (publica):** https://github.com/vientonorte/vientonorte-core  
**Doc org:** https://github.com/vientonorte/vientonorte-core/blob/main/docs/PACKAGES-CORE.md  
**DS visual:** https://dot-wool-76997229.figma.site  

Este portafolio **consume** el design system / core compartido (no duplica tokens UI).

## Dependencias (pinned)

```json
"@vientonorte/a11y": "0.1.1",
"@vientonorte/cli": "0.1.1",
"@vientonorte/security": "0.1.1",
"@vientonorte/tokens": "0.2.0",
"@vientonorte/ui": "0.3.2"
```

```bash
npx vientonorte --help
# vientonorte init <nombre> --template=react-ts [--with-auth] [--with-analytics]
```

## Local

```bash
export NODE_AUTH_TOKEN=ghp_xxx   # PAT read:packages
# o token en ~/.npmrc para //npm.pkg.github.com/
npm ci
```

Ver `.npmrc.example`. El `.npmrc` local (gitignored) usa `${NODE_AUTH_TOKEN}`.

## CI

- Secret `VN_PACKAGES_TOKEN`
- `permissions.packages: read`
- `setup-node` → `registry-url` + `scope: @vientonorte`
- `npm ci` con `NODE_AUTH_TOKEN`

## Bump de core

1. Cambiar / versionar en `vientonorte-core`
2. Actions → **Publish (GitHub Packages)**
3. PR aquí con pins nuevos
4. CI verde → merge → Pages deploy

## Política multi-repo

Misma regla en table-ro, uxtools, aruma, dashfin: secret + `.npmrc` apuntando a Packages.  
No usar `file:../vientonorte-core` en prod ni `*` en versiones.
