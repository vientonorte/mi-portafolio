# Registro de archivo · src/assets hash PNGs

- **Fecha:** 2026-07-21
- **VB Rö:** GO (captura GEES · UX TOOLS · archive)
- **Origen:** `src/assets/*.png` (exports Figma hash, 0 imports en código)
- **Destino:** `archive/src-assets-hash-2026-07-21/`
- **Motivo:** pipeline MAINTENANCE_GUIDE — staging post-sync no debe vivir en `src/`
- **Conteo:** 39 PNG
- **Peso:** 42M

## Inventario

| Archivo | Bytes | SHA256 (12) |
|---------|------:|-------------|
| `07b1a691d848de20260b8010984e7e68fe438bba.png` | 383917 | 914fba9a9ad5 |
| `0a0ed13a8f1836aed4325be4398240085ee9c5be.png` | 210774 | c050f4675a8f |
| `0ddc6d387f6fec8fd73c93778e82ff34a1b1e8cd.png` | 471351 | e6d6947626fe |
| `2508fc8ab6c5af6bc6d42eccc7d06b1981e851e2.png` | 1402257 | b0f76463936b |
| `2c1df5440eaeb843fa0270932c4093e53058001b.png` | 520963 | a0444a9ae161 |
| `2ca85dae07f2e9ebad27cc29f689df7f2ff0cd05.png` | 254085 | 3376bc44cbbc |
| `351998f57aeca5a0721f29366c3e661a468847b6.png` | 272324 | 2098ee69b839 |
| `39c89e78c4c839df83404a07c05ea25dc2ac175c.png` | 108262 | 7f3b4b88972d |
| `4ba4d92eaa293e4c6c9e1d685912cc0f04035e80.png` | 231846 | ce901031605b |
| `70518d704593e324e05fed17928549e0e0e5fbd0.png` | 258227 | 7880f468b165 |
| `77b107e97d12e770619a89e345639f0bc08f5202.png` | 223978 | 8366dfebd7a2 |
| `7b93916ad89e7643ed7321043ef8cd80b539c82f.png` | 7868098 | 4d753d032d8f |
| `84a772361fb8479f9e7f68a945694e700b7f7321.png` | 129398 | a21d025f4328 |
| `87f8a6e7a81d96e3e86411d762aae491d3952734.png` | 725303 | 6573153208ec |
| `8b2d0de2ad888eef0501080acb3db66b4d75ba53.png` | 6056814 | a2b7898322bf |
| `8f110ae182ecb20cb32d266577a4411e4215f9a8.png` | 129158 | 80e98411eea7 |
| `902a4f265e5b0402c9ddd635345b89de4c716626.png` | 713270 | 0d6410dfa7ed |
| `93f752ccf2bf3e160e29c0654ed37065e66cd03a.png` | 172204 | 7cff28069bfe |
| `94e64e0789d3cb3779d529afdfca4db701e1ffe5.png` | 109084 | 61777229a295 |
| `9825b5996f08c4355379ad19609c7a6ca48a14b5.png` | 6417499 | 77f249b7f890 |
| `a071203af6e3a2f88489671218e31f4f1b63c06a.png` | 705617 | acd79c3c583d |
| `a31e098be9118630dbd647bf5cfea93582c8f9af.png` | 19574 | d4ea87da284e |
| `a633e31e4ce4652b6a54e3d62bc05ce3b6921232.png` | 25942 | 105da4f4eaf3 |
| `b39a807f5a67223b2c7c2fd9399005166e91a018.png` | 2320142 | 38e9c8ce1ee7 |
| `b87e8d13e8b7c413ed8058ac4f94f3c039ee34f2.png` | 329664 | 040a26f88bfe |
| `b9ae54b6596cfbe173cbffc5d7c905a655a6af7b.png` | 134995 | c169a24f07f9 |
| `c5ab5a126dbc3ad0e19afa9c12c260710138c58f.png` | 1755287 | dba2db071893 |
| `ca7a4a167c789c951e4e08b0ba00177a6fc58634.png` | 168388 | af913ac14c50 |
| `cc2a6336d20bfd98d5c7da3861869d6cebc7e1a2.png` | 108412 | 97feaa6565a9 |
| `d1ab9c8c94b2a7e89d137d276bf558f69f930bbc.png` | 254213 | a97585b914cf |
| `d7544032e8a1bb7f39d2362b91903b4c94308f07.png` | 140691 | f4127020f238 |
| `d7cad0e13be7a40071ccaec70eb93d0304f2b679.png` | 14590 | 2dfef4f22bf4 |
| `d875ff7cbc9428b37b29af656c4f765e8cb8b779.png` | 567938 | 73a747f39168 |
| `deca6bc1a3a2801577b021b134a72cf71a3c5753.png` | 435772 | d2a932289c46 |
| `ebe0e06c4fc32f665e80315679b4b0dd7b1525f1.png` | 103613 | e4bcf5d6788c |
| `ed23209432cc1a61f91676018dae815609d8b95e.png` | 9529314 | 4d8dc80a067d |
| `eead87221b58b55c215867c791503693f5e6382e.png` | 251197 | 5b0b1f202464 |
| `f88b43537c2b32df75546b730b772752060980c3.png` | 210577 | 670b558d9f6e |
| `fa6311b2bc30bfad079b553c3eaf7a672186c7d7.png` | 147289 | c3f077ddc2fa |

## Política

- No borrar este archive sin VB + nota en inventario assets Obsidian.
- Fuentes canónicas live: `public/images/**` + `portfolio-image-urls.ts`.
- Re-export: Figma → `src/assets/<hash>.png` temporal → `npm run sync:images` → borrar hash del staging.
- Carpeta gitignored de PNG; este `REGISTRO.md` sí se versiona.

## 2026-07-21 — restore for CI/build

`figma:asset/*` y `vite.config` aliases resuelven a `src/assets/<hash>.png`.
Tras el archive el **build de CI falló** (ENOENT). Se **restauraron** los PNG
en `src/assets/` y se volvieron a versionar (`git add -f`) hasta migrar imports
a `public/images` / `portfolio-image-urls`.

La carpeta `archive/` sigue como espejo local; la SoT semántica en runtime
público es `public/images/`. `sync-semantic-images.sh` ahora hace
`require_public` y solo copia desde hash si existe (src o archive).
