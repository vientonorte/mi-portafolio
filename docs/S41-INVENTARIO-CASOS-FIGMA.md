# S41 · Inventario Figma de casos para las secciones 02/03 de /servicios/

**Fecha:** 2026-10-02 (CLT, UTC-3) · **Modo:** solo lectura en Figma (no se editó ningún archivo) · **Para:** review del lunes 2026-10-05, 10:00 CLT.
**Pedido de Rö:** el sitio de gobierno de Filipinas, Claro, Walmart, Transvip y Maraña, más todo lo que esté en «Conceptos». **Penji queda fuera.**
**Sin PII:** aquí no hay nombres de personas, correos ni montos. Cuando un frame los muestra, se avisa sin citarlos.

## Cómo se buscó

- **Figma, conector MCP de solo lectura:** `whoami`, `get_metadata` (lista de páginas y frames), `get_screenshot` (revisión visual). El MCP **no lista archivos ni proyectos**. Solo abre un archivo si se conoce su key.
- **Fuentes de keys:**
  - Repo: `rg 'figma.com'` en `src/`, `docs/` y `CHANGELOG.md`, más `src/data/figma-assets-ssot.ts`.
  - Notas de inventario Figma ya existentes (box y vault de Rö): recents de Figma Desktop del 27-ago, inventario del 2-sep y la nota «PRUEBAS CONCEPTOS».
  - Historial local de pestañas de Figma Desktop: solo títulos y keys.
  - Google Drive (`search_files`).
  - Gmail (`search_threads`, solo lectura).
- **Límite técnico:** en los archivos grandes, `get_metadata` llega truncado a unos 20 KB. Por eso algunos frames clave se dan **a nivel de página** (el node-id de la página también es un link válido) y no frame por frame. Donde pasa, se marca «frame exacto pendiente».

## Resumen

| Caso | Estado | Archivo(s) | ¿Encargo real o concepto? (según el archivo) |
|---|---|---|---|
| Sitio de gobierno de Filipinas | **Encontrado, pero excluido**: es un archivo Penji | «Penji · DoT Philippines · Website Redesign» | No aplica (regla: sin Penji) |
| Claro | Encontrado (2 archivos) | Portal Comercial Claro · Tienda Claro 2021 | Por confirmar |
| Walmart | **No encontrado** | — | — |
| Transvip | Encontrado (2 archivos) | System Design APP Cliente · Informes Transvip – Product Design | Trabajo real in-house (lo dice el archivo) |
| Maraña | **No encontrado** (sin key) | — | — |
| «Conceptos» | Encontrado: 1 archivo y 1 página | «Prueba de Conceptos» (MASCOTAPP) · página «PRUEBAS CONCEPTOS» del archivo Transvip | Por confirmar (MASCOTAPP) / real in-house (Transvip) |

---

## 1. Sitio de gobierno de Filipinas: excluido (Penji)

- **Dónde apareció:** en el historial de pestañas de Figma Desktop, con el título «Penji · DoT Philippines · Website Redesign». La bitácora KPI del vault (18-sep y 21-sep-2026) lo registra como un rediseño hecho «from Penji brief».
- **Decisión aplicada:** como es trabajo Penji, **no se inventarió**: no se abrieron frames ni se listan URL o node-ids.
- **Pendiente:** ver «Decisiones para Rö» (D1).

## 2. Claro

### 2a. Portal Comercial Claro

- **Archivo:** Portal Comercial Claro
- **URL:** https://www.figma.com/design/D39xjsA7ObbhntcDEyPWQG/Portal-Comercial-Claro?node-id=0-1 (página «Desktop», `0:1`)
- **Frames clave:**

| Frame | node-id | Tamaño | Tipo |
|---|---|---|---|
| Portada «Rediseño Portal Comercial» | `7:0` | 1700×1200 | Portada |
| 01 Home | `7:473` | 1700×5985 | Desktop |
| Mobile | — | — | **No se ve en Figma.** En el repo hay `public/images/vn-assets/claro-portal-mobile.jpg`, pero el frame de origen no se ubicó |
| Antes/después | — | — | **No hay** frames rotulados así |

  Hay otros ~30 grupos de frames en la página (todos desktop, según la captura general), cuyo listado completo quedó truncado: frame exacto pendiente.
- **¿Encargo o concepto?:** **por confirmar**. La portada se rotula «Canales Digitales AMX · Rediseño Portal Comercial» y lleva el logo Claro, pero el archivo no dice si fue un encargo, una propuesta o un ejercicio.
- **Asset para la tarjeta browser-frame (16:10):** `7:473` (01 Home), recortando la parte de arriba a 1700×1062 (hero, accesos rápidos y planes). URL: https://www.figma.com/design/D39xjsA7ObbhntcDEyPWQG/Portal-Comercial-Claro?node-id=7-473. La portada `7:0` es un mockup de laptop en 1,42:1, menos útil dentro de un browser-frame.
- **Notas de marca:**
  - Marca real del cliente en todos los frames: logo Claro, Claro video y Claro Tienda.
  - Aparecen productos de terceros con su marca (smartphones de marcas comerciales).
  - La sección Covid-19 de la home tiene una **foto de una persona** (stock): no usarla en la tarjeta.
  - Hay precios y tarifas de ejemplo en pesos mexicanos: no citarlos.

### 2b. Tienda Claro 2021

- **Archivo:** Tienda Claro 2021
- **URL:** https://www.figma.com/design/lrMqvUERZjDwTwZpQRBSC5/Tienda-Claro-2021?node-id=0-1 (página «Page 1», `0:1`)
- **Frames clave:**

| Frame | node-id | Tamaño | Tipo |
|---|---|---|---|
| Mi Claro tienda catálogo (listado «Celulares Prepago» con filtros) | `1:621` | 1700×2813 | Desktop |
| Resto del flujo de tienda (home, listados, ficha, comparador, carro, checkout) | página `0:1` | ~15 frames | Desktop · frame exacto pendiente (metadata truncada) |
| Mobile | — | — | No se ve en la página |
| Antes/después | — | — | No hay |

- **¿Encargo o concepto?:** **por confirmar**. El archivo no lo dice.
- **Asset para la tarjeta (16:10):** `1:621`, recortando la parte de arriba a 1700×1062 (header, filtros y primera fila de cards). URL: https://www.figma.com/design/lrMqvUERZjDwTwZpQRBSC5/Tienda-Claro-2021?node-id=1-621
- **Notas de marca:**
  - Logo Claro en el header.
  - Fichas de producto con modelos y marcas de terceros.
  - Precios de ejemplo: no citarlos.
  - El header muestra la dirección de una tienda física: recortarla.

## 3. Walmart: no encontrado

- **Dónde se buscó:**
  - Repo: no hay ningún link de Figma. Solo existen el monograma `public/images/brands/walmart.svg` y el teaser «upcoming» en `src/data/upcoming-cases.ts`.
  - Inventarios Figma (box y vault), historial de Figma Desktop, Drive (título y texto) y Gmail («walmart» con figma, prototipo o mockup): sin resultados.
- **Nota del vault (`Branding/Walmart Chile.md`):** «no usar wordmark oficial sin asset limpio aprobado».
- **Sin URL:** no se inventa ninguna.

## 4. Transvip

### 4a. System Design APP Cliente – Transvip

- **Archivo:** System Design APP Cliente – Transvip
- **URL:** https://www.figma.com/design/AEMOE8Hv5iv1nfyR7jlMgO/System-Design-APP-Cliente---Transvip
- **Páginas:**
  - El MCP solo listó dos: «PRINCIPIOS Y FUNDAMENTOS» `1:4` y «MATERIAL UI» `1:2`.
  - Igual se pudieron abrir «PRUEBAS CONCEPTOS» `1:5` y «COMPONENTES» `0:1`.
  - El inventario del 27-ago registra 7 páginas.
- **Frames clave:**

| Frame | node-id | Tamaño | Tipo |
|---|---|---|---|
| Principios y Propósitos del System Design | `323:48165` | 1216×747 | Portada del DS (≈16:10) |
| Página PRUEBAS CONCEPTOS (62 frames: cards MVP 1/2/4, sidebar y tabs) | `1:5` | — | Mobile (componentes de 360 px) |
| MVP 2 [Tabs Próximo Viaje – RT Programado] Ida Extendido | `432:44105` | 361×302 | Mobile, componente |
| MVP 2 [Card Control Solicitud] Programado | `422:68518` | 360×168 | Mobile, componente |
| MVP 1 [Card Servicios – Viajes] TAXI RT IDA Desplegado | `422:68895` | 360×323 | Mobile, componente |
| COMPONENTES (átomos, moléculas, organismos y templates) | `0:1` | — | Librería |
| Pantallas completas desktop / mobile | — | — | **No ubicadas como frame** en este archivo. En el repo están `public/images/transvip/app-desktop.png` (1239×663) y `app-mobile.png` (554×1125), con origen por confirmar |
| Antes/después | — | — | No hay frames rotulados así (ver 4b, «Diseños previos») |

- **¿Encargo o concepto?:** **trabajo real in-house**, según el archivo. La tarjeta «Propósito» dice «Usuarios: El equipo interno de Tecnología y Producto». La instancia del logo se llama «Logo Real Transvip». **Ojo:** el trabajo es de cuando Rö estaba empleado en Transvip. **No es un cliente de VN.**
- **Asset para la tarjeta (16:10):** `323:48165`, casi 16:10 (1,63:1); basta un recorte mínimo. URL: https://www.figma.com/design/AEMOE8Hv5iv1nfyR7jlMgO/System-Design-APP-Cliente---Transvip?node-id=323-48165
- **Notas de marca:**
  - Logo Transvip grande (versiones naranja y negra).
  - En los componentes hay direcciones y horarios de ejemplo (calle, aeropuerto): son datos de muestra, pero conviene no ponerlos en primer plano.

### 4b. Informes Transvip – Product Design (archivo del prototipo)

- **Archivo:** Informes Transvip – Product Design. La URL `/proto/` del repo apunta a este archivo.
- **URL:** https://www.figma.com/design/sRPhPaZNBewEhLVwu07TFu?node-id=0-1 (página única `0:1`, con línea de tiempo 2022–2023)
- **Frames clave (todos de 1920×1080):**

| Frame | node-id | Tipo |
|---|---|---|
| Portada – Informe System Design App – Transvip | `35:49905` | Portada |
| Intro – Informe Balance diseños App | `35:49896` | «Antes»: diagnóstico de los diseños previos |
| Detalles – Informe Balance diseños App | `35:49886` | Antes/después: «Refinamientos APP_2022» vs «Refinamientos APP» |
| ETA – ZARPE (KIT UI nueva app) | `35:49988` | Detalle de componente |
| Mensajes Flujo Cancelación | `35:50009` | Modales mobile |
| Sección DISCOVERY PRODUCTO | `35:49867` | Sección contenedora |

- **¿Encargo o concepto?:** **trabajo real in-house**. Los textos hablan de «sprints de desarrollo para la nueva app cliente transvip», con tickets ACT-xxx.
- **Asset para la tarjeta:** ninguno sirve tal cual. `35:49896` y `35:49886` (16:9) se pueden usar recortados a 16:10 si se quiere contar el «antes». URL: https://www.figma.com/design/sRPhPaZNBewEhLVwu07TFu?node-id=35-49886
- **Notas de marca y PII:**
  - ⚠ La **portada `35:49905` muestra el nombre y un correo corporativo**: no usarla.
  - Los pies de varias láminas llevan nombre y cargo.
  - Las láminas de benchmark muestran apps de la **competencia** (marcas de terceros): no usarlas.

## 5. Maraña: no encontrado

- **Dónde se buscó:**
  - Gmail: hay avisos de Figma de que el **team «Maraña» se eliminó** (sep-2022) y se ofreció restaurarlo (oct-2022).
  - Inventario Figma del box (2-sep-2026): una búsqueda devolvió «Plantila Sistema de Diseño Maraña» (de hace unos 6 años), pero **sin key ni URL**.
  - Repo, vault, Drive e historial de Figma Desktop: ninguna key.
- **Lo que sí hay fuera de Figma:**
  - Monograma `public/images/brands/marana.svg`.
  - Cover de Khuro (CDN) referenciada en `src/data/about-visuals.ts`.
  - En Drive hay una carpeta y formularios de la agencia, pero no son de Figma y no se abrieron.

## 6. «Conceptos»

- **Qué se encontró:** en Figma no apareció ningún **proyecto** llamado «Conceptos». El único proyecto del team Rö (14 archivos, inventario del 2-sep) no tiene ese nombre. Lo que coincide es esto:

### 6a. Archivo «Prueba de Conceptos»

- **URL:** https://www.figma.com/design/CBguM4Y5rIvc9TV5pGhOxL/Prueba-de-Conceptos
- **Páginas:** «MASCOTAPP» `2844:427` y «KIT UI ICONOS» `301:69`.
- **Frames clave:**

| Frame | node-id | Tipo |
|---|---|---|
| Página MASCOTAPP: secciones «TO DO» `2844:428` y «USER FLOWS» `2844:479` (incluye «MASCOTAS» `2844:480`), más pantallas mobile y un kit UI | `2844:427` | Mobile y flujos · frame exacto de pantallas pendiente |
| KIT UI ICONOS (íconos Material, por ejemplo el frame «Alert» `301:70`) | `301:69` | Librería de íconos, sin valor de caso |
| Desktop / antes-después | — | No hay |

- **¿Encargo o concepto?:** **por confirmar**. El archivo no tiene cliente ni contexto. `figma-assets-ssot.ts` lo marca como «skip… MASCOTAPP pages, not Claro».
- **Asset para la tarjeta:** ninguno recomendado (no hay pantalla desktop y las pantallas mobile no tienen node-id confirmado).
- **Notas:**
  - No muestra marcas de clientes.
  - El inventario del 2-sep anotó que la búsqueda «Claro» devolvía páginas «Claro Chile» / «Prototipo Mobile Tienda Equipos Claro Chile» dentro de un «Prueba de Conceptos», pero **hoy este archivo no tiene esas páginas**. Puede haber un segundo archivo con el mismo nombre: por confirmar.

### 6b. Página «PRUEBAS CONCEPTOS» del archivo Transvip

- Es la página `1:5`, ya descrita en 4a: https://www.figma.com/design/AEMOE8Hv5iv1nfyR7jlMgO/System-Design-APP-Cliente---Transvip?node-id=1-5

### 6c. Descartado

- «Prueba de concepto Dinámica Clase (Community)» es un FigJam de comunidad, una dinámica de clase. No es un caso.

---

## Decisiones para Rö

1. **D1 · Filipinas = Penji.** El único archivo del sitio de gobierno de Filipinas es de Penji, y la regla vigente lo excluye. ¿Se mantiene fuera de 02/03, o hay un permiso explícito para mostrarlo (y en qué forma)?
2. **D2 · Experiencia de Rö o caso VN.**
   - Transvip y Claro son trabajo de empleos o agencias, no clientes de VN.
   - El 1-oct se decidió que la franja «Experiencia de Rö» saliera de /servicios/.
   - ¿Vuelven a /servicios/ 02/03 como casos, con qué rótulo (por ejemplo «Experiencia previa del equipo»), o van a otra página?
3. **D3 · Claro: ¿encargo o propuesta?** El archivo dice «Canales Digitales AMX · Rediseño Portal Comercial», pero no si fue un encargo. Hay que confirmarlo, y también si se puede mostrar la marca Claro.
4. **D4 · Walmart y Maraña sin Figma.** ¿Hay otro origen (PDF, capturas, otra cuenta de Figma)? ¿Se restauró el team Maraña? Si no, quedan solo como logo o texto, o se sacan de 02/03.
5. **D5 · Assets 16:10 propuestos.**
   - Claro: `7:473` o `1:621`, recortados.
   - Transvip: `323:48165`.
   - ¿OK con estos? ¿Quién hace la exportación (export o screenshot) y la limpieza (sin precios, sin dirección, sin la foto de persona)?
6. **D6 · «Conceptos».**
   - ¿«Conceptos» era el archivo «Prueba de Conceptos» (MASCOTAPP), la página «PRUEBAS CONCEPTOS» de Transvip u otro proyecto que el MCP no ve? Si es otro, hace falta su URL.
   - ¿Existe un segundo «Prueba de Conceptos» con páginas «Claro Chile»?
7. **D7 · MASCOTAPP.** ¿Es un concepto propio o un encargo? Hoy el SSOT dice «no usar».
8. **D8 · Frames exactos pendientes.** Para los archivos grandes (Tienda Claro, Portal Claro y MASCOTAPP), ¿se acepta el node-id de página o se pide una pasada con la lista completa de frames? La metadata del MCP llega truncada.

---

## Segunda pasada (2-oct 18:39)

Pasada enfocada en **Walmart** y **Maraña**. Solo lectura en Figma, Drive, Gmail y el Mac. Las rutas locales se anotan sin nombres de personas: `<iCloud>` = `~/Library/Mobile Documents/com~apple~CloudDocs/Documents`; `<asesoría>` reemplaza carpetas con nombre de persona.

### Walmart

> **Corrección (2-oct 18:51):** Rö confirma que **sí hay un concepto de Walmart** dentro de «Prueba de Conceptos»: https://www.figma.com/design/CBguM4Y5rIvc9TV5pGhOxL/Prueba-de-Conceptos. Queda registrado como **concepto propio**, porque el archivo no dice lo contrario hasta donde se pudo leer.
>
> - **Node-ids de los frames (desktop, mobile, antes/después): pendientes.** El recorrido nodo por nodo quedó bloqueado por la cuota del MCP de Figma.
> - El archivo está en el team Starter «Proyectos», que permite 20 llamadas al mes, y la cuota ya se agotó. El bloqueo afecta tanto a get_metadata como a get_screenshot.
> - **Lo que se alcanzó a leer:** el archivo tiene 2 páginas, MASCOTAPP (`2844:427`) y KIT UI ICONOS (`301:69`).
>   - El root de MASCOTAPP llegó truncado a 20 KB de 79 KB.
>   - Solo se vieron la sección «TO DO» (`2844:428`) y el inicio de «USER FLOWS» (`2844:479`, 9072×5328 px, con la subsección «MASCOTAS» `2844:480`).
>   - Los frames de Walmart deben estar en los 59 KB restantes, ya sea dentro de «USER FLOWS» o como frames sueltos de la página.
> - **No hay un segundo «Prueba de Conceptos».** En las pestañas y recientes de Figma Desktop del Mac solo figura `CBguM4Y5rIvc9TV5pGhOxL`; el otro resultado es el FigJam de comunidad, ya descartado.
> - **Asset 16:10:** pendiente hasta tener el frame principal. Ver D4.
>
> Lo que sigue es el registro original de la segunda pasada, que no encontró el concepto.

**No aparece ningún archivo Figma, export ni PDF de caso.**

| Hallazgo | Ruta / URL | node-id | ¿Encargo o concepto? | Asset 16:10 |
|---|---|---|---|---|
| Nota de marca en el vault: «Walmart Chile (DCS)», 2022, rol diseñador web, «diseño y contenido para canales digitales enterprise». Sus únicos assets son el monograma y la indicación de no usar el wordmark oficial | vault Obsidian `Viento Norte/Branding/Walmart Chile.md` | — | Encargo real a través de un empleo (mayo–junio 2022 según `upcoming-cases.ts`). No es cliente VN | Ninguno |
| Monograma «W» | `public/images/brands/walmart.svg` (repos locales y copia en iCloud) | — | — | No sirve para 16:10 (es un logo) |
| Teaser «upcoming» `walmart-chile` («caso corto en documentación») | `~/code/mi-portafolio-branding-home/src/data/upcoming-cases.ts` | — | — | Ninguno |

Lugares revisados sin resultado:
- **Figma Desktop:** `settings.json` contiene unas 70 pestañas o recientes y ninguna es de Walmart. Tampoco hay coincidencias en IndexedDB, Local Storage, Session Storage ni Service Worker. Solo hay una cuenta autenticada.
- **Conector Figma:** tiene acceso a 5 plans: Rö (pro), EDU21, Proyectos, SURA (org, guest) y un Starter. No tiene una herramienta para buscar archivos, y no hay key candidata que validar.
- **Spotlight y `find`** en Documents, Desktop, Downloads, iCloud y el vault: no hay `.fig`, PNG, JPG ni PDF de caso. El único resultado por nombre es un documento laboral, que no es un asset (ruta omitida).
- **Drive** (ambos conectores): «Walmart» solo aparece dentro de los CVs. No hay ningún archivo con «Walmart» o «Lider» en el título.
- **Gmail:** no hay ningún link de figma.com asociado a Walmart. Solo aparece correo promocional de retail.

### Maraña

Se encontraron capturas reales del sitio y exports del tablero de trabajo, pero **no hay un archivo Figma recuperable**.

| Hallazgo | Ruta / URL | node-id | ¿Encargo o concepto? | Asset 16:10 |
|---|---|---|---|---|
| Captura de la home de maraña.cl (2021), 1440×900 | `<iCloud>/GitHub/Portafolio/mi-portafolio/assets/img/pantalla maraña.png` | — | Encargo real (Rö fue diseñador UX/UI de la agencia, 2020–2021) | **Candidato con reservas:** ya es 16:10, pero hay que recortar el chrome de Safari (la barra de favoritos muestra un nombre propio) y muestra rostros en una videollamada. Recomendación: no usarla tal cual |
| Captura de la página «Digitalización / Taller de co-diseño» de maraña.cl (2021), 1440×900 | `<iCloud>/GitHub/Portafolio/mi-portafolio/assets/img/MARAÑA TALLER.png` | — | Encargo real | **Candidato preferente:** es 16:10 y no muestra rostros, pero hay que recortar el chrome del navegador (favoritos con nombre propio) o rehacer la captura |
| Imágenes de portafolio antiguo (2022) | `<iCloud>/GitHub/Portafolio/mi-portafolio/assets/img/RIGG/maraña ux.png` (969×559) y `RIGG/marañaestrategias.png` (545×300) | — | Encargo real | Resolución baja para 16:10 |
| Video de campaña SEM (2020) | `<iCloud>/GitHub/Portafolio/mi-portafolio/assets/img/SEM MARAÑA.mp4` | — | Encargo real | Frame posible, por confirmar |
| Logos | `<iCloud>/GitHub/Portafolio/mi-portafolio/assets/img/maraña logo.svg`, `Marana-Blanca-300x107.png`, `public/images/brands/marana.svg` | — | — | No (son logos) |
| 10 exports JPG «Diseños UX de Maraña – …» (cadena de valor, propuesta de valor, logística inversa, economía circular, guías de WordPress), junio 2021. **La captura de «MARAÑA TALLER» muestra que «Diseños UX de Maraña» es un tablero de Miro, no un archivo Figma** | `<iCloud>/Asesorías/<asesoría>/…/Diseños UX de Maraña - *.jpg` | — | Material de taller o asesoría | No: son diagramas en formato vertical o 4:3 |
| Drive · carpeta compartida «Maraña» (2018) | https://drive.google.com/drive/folders/1KI29jV9nZcyGBJQBXQHp-h67Each9mN9 | — | Por confirmar | Solo contiene la subcarpeta «Conocimiento compartido» |
| Drive · «Metodo Maraña.png» (2019) | https://drive.google.com/file/d/1WPYLsHDjyDnove90D_LGAtZRoInlFFpE/view | — | Por confirmar (pieza de la agencia) | Por revisar (no se descargó) |
| Drive · «Wireframe Clínica.png» (2019), en la carpeta «Clínica Marketing Online» | https://drive.google.com/file/d/1R6ipIOHzBjAOTLFkaWZ4xzSlLUgFhS7Y/view | — | Por confirmar | Por revisar |
| Drive · formulario «Heurística de Maraña» y un PDF de informe heurístico | https://docs.google.com/forms/d/10LQY3spV1mLrobDv72rBHqfmV5G62J3DJhotXUgqEZA/edit · https://drive.google.com/file/d/1xCGgFaIBV24bXDh3AKKxxMSilXbTAUAX/view | — | Por confirmar | No (son documentos) |
| Sitio legado del partner | `<iCloud>/GitHub/Portafolio/mi-portafolio/partner-marana.html` | — | — | No |

Lugares revisados sin resultado:
- **Figma:** no hay ninguna pestaña o reciente con «Maraña». Gmail confirma que el team «Maraña» se eliminó el 10-sep-2022 y que el plazo para restaurarlo venció en octubre de 2022. Ningún plan visible para el conector se llama Maraña. **Ninguna cuenta tiene acceso a ese team.**
- **Caché de Figma Desktop:** no hay coincidencias.
- **No hay archivos `.fig`** de Maraña en el disco.

### Otros (anotados)

- **Filipinas:** solo aparece «Penji · DoT Philippines · Website Redesign» (`QcI0E5zQudZuCNoB405OgV`, más un `.fig` y un `.zip` en `<iCloud>/Penji/SEPT/DoT_Philippines-Website-Redesign/Source File/`). **Queda fuera**, como en la primera pasada.

### Dónde se buscó (resumen)

1. Figma Desktop (`~/Library/Application Support/Figma/`): `settings.json`, `desktop_state.json` y DesktopProfile v39–v43 (IndexedDB, Local Storage, Session Storage, Service Worker, búsqueda UTF-8 y UTF-16).
2. Conector Figma: `whoami` (5 plans) y `get_metadata` del archivo de control `CBguM4Y5rIvc9TV5pGhOxL`.
3. Drive: `user-Google-drive` (search_files por fullText y por título) y `user-Google Drive-xai` (search), con los términos Walmart, Maraña, Marana, Filipinas, Philippines, Lider, portafolio y portfolio.
4. Mac: `mdfind` (por nombre y por contenido) y `find` acotado a Documents, Desktop, Downloads, iCloud y el vault de Obsidian.
5. Gmail: `search_threads` con figma.com y los nombres de los casos.

### Impacto en D4

- **Walmart (actualizado 2-oct 18:51):** pasa a ser un **concepto propio** en `CBguM4Y5rIvc9TV5pGhOxL`. Para cerrar la tarjeta falta el node-id del frame principal y su asset 16:10. Hay tres vías:
  - (a) Rö copia desde Figma el link del frame («Copy link to selection», que trae `?node-id=`).
  - (b) Rö mueve el archivo al team «Rö» (pro, seat Full, 200 llamadas al día). Ese cambio lo hace Rö en Figma; el agente no edita Figma.
  - (c) Se espera al reinicio mensual de la cuota Starter.
  
  Mientras tanto, no se muestra la marca Walmart sin un asset limpio, según la nota de marca.
- **Maraña:** puede tener tarjeta 16:10 con una captura limpia de `MARAÑA TALLER.png` (recortada o rehecha), sin depender de Figma. Falta el OK de Rö para usar la marca de una agencia que ya no opera como cliente.
