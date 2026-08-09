# Deploy — mi-portafolio → vientonorte.io

**Producto:** SPA brand / front office Viento Norte  
**Canon:** `https://vientonorte.io/` (sin `/mi-portafolio/`)  
**Repo git:** `vientonorte/mi-portafolio` (alias producto: vientonorte-fo)

Ver también: [docs/URL-CANON-VIENTONORTE.md](docs/URL-CANON-VIENTONORTE.md) · hub [DEPLOY.md](https://github.com/vientonorte/vientonorte.github.io/blob/main/DEPLOY.md)

---

## Ownership (resumen)

| Qué | Dónde |
|-----|--------|
| Código SPA, CI, Lighthouse, a11y producto | **este repo** |
| Custom domain + cert apex | repo **hub** `vientonorte.github.io` (`CNAME`) |
| Publicación apex | Deploy de este repo **reescribe root del hub** y el hub publica vía `gh-pages` |
| Ops / ledger en prod | se **bundle** desde hub en el job de deploy |

```text
push/merge → main
  → workflow CI (typecheck, tests, nav, routes, a11y…)
  → workflow Deploy (solo si CI success | workflow_dispatch)
      · npm ci · preprod gates · vite build (base /)
      · 404.html + legacy /mi-portafolio shell
      · clone hub → copiar ops/ → dist/ops
      · push dist → hub main (commit deploy: SPA…)
      · upload-pages-artifact + deploy-pages (path /mi-portafolio/ en Pages de este repo)
```

El **apex real** lo sirve el hub (user site + CNAME). El Pages de este repo queda como path secundario / artifact.

---

## Cómo desplegar

### Release normal

1. PR → `main` con CI green.
2. Merge (squash preferido).
3. Esperar **CI** en `main` → **Deploy to GitHub Pages**.
4. Verificar:
   - Actions: Deploy success + en hub “Deploy gh-pages branch” + pages-build-deployment.
   - Live: `curl -sL https://vientonorte.io/ | grep -oE 'assets/index-[^"]+\.js'`

### Redeploy manual (sin código)

```sh
gh workflow run deploy.yml -R vientonorte/mi-portafolio --ref main
```

### Local preprod

```sh
npm run preprod          # o preprod:quick / preprod:dev
npm run qa:production    # smoke dominio (post-deploy)
```

Checklist largo: [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md).

---

## Secrets / env (deploy)

| Secret / var | Uso |
|--------------|-----|
| `VN_HUB_DEPLOY_TOKEN` o `VN_PACKAGES_TOKEN` | Push al hub + clone ops (fallback `GITHUB_TOKEN` si permisos) |
| `VITE_GA_MEASUREMENT_ID`, `VITE_GTM_ID` | Analytics opcional |
| Form / schedule URLs | Contacto y free a11y |
| `NODE_AUTH_TOKEN` / packages | `@vientonorte/*` en GitHub Packages |

Worker contacto (aparte de Pages):

```sh
cd worker && npx wrangler deploy --config wrangler.contact.toml
# canónico: https://contact.vientonorte.io
```

---

## Qué no hacer

- **No** pushear a mano un `dist/` roto al hub sin pasar CI.
- **No** borrar `CNAME` del hub sin plan de migración (rompe apex).
- **No** tratar `vientonorte.github.io` sin dominio como “prod SEO” — el canon es `.io`.
- Working tree con borrados masivos de `public/`/`src/assets`: restaurar antes de commit (`git restore`).

---

## Migración CNAME a este repo

**No es el default.** Hoy el hub posee el dominio y este repo publica el contenido.

Si se decide migrar (confirmación humana: **«sí migra CNAME»**):

1. Freeze deploys concurrentes.
2. Pages de **mi-portafolio** → GitHub Actions + custom domain `vientonorte.io`.
3. Quitar custom domain + `CNAME` del **hub**.
4. Cambiar `deploy.yml`: dejar de pushear root al hub; servir apex solo con `deploy-pages`.
5. Redefinir dónde vive `/ops/` (hub en `*.github.io/ops`, worker, o subpath).
6. Smoke apex, GSC, Ads, contact CORS.
7. Rollback documentado en hub `DEPLOY.md`.

Detalle y riesgos: hub `DEPLOY.md` § Migración CNAME.

---

## Post-merge checklist rápido

- [ ] CI main green  
- [ ] Deploy main green  
- [ ] Hub commit `deploy: Viento Norte SPA…`  
- [ ] Apex 200 + asset hash nuevo  
- [ ] `/ops/finanzas/` accesible si se bundleó ops  
- [ ] Contact OPTIONS 204 desde origen `.io`  
