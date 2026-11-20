# Auditoría, dirección de arte y refactorización — Panadería y Pastelería Kenia

**Versión de trabajo:** 2.1 · **Fecha:** 15 de noviembre de 2026  
**Base técnica:** HTML5, CSS y JavaScript nativos.  
**Alcance:** auditoría visual/técnica y refinamiento de presentación de las páginas existentes.

## 1. Resumen ejecutivo

El repositorio contiene un sitio web estático de Panadería y Pastelería Kenia. No utiliza React, Vue, Tailwind, un router ni un sistema de componentes de terceros. La identidad visual ya estaba documentada y reconocible: logotipo original con lettering rojo y espigas doradas, fotografías propias del producto y una paleta crema, rojo, oro y cacao.

La intervención conservó esa identidad y se centró en cinco asuntos concretos:

1. Centralizar los tokens visuales globales en una única hoja compartida.
2. Reforzar la voz editorial con titulares serif y texto funcional sans-serif local.
3. Corregir el selector de testimonios que no coincidía con el marcado HTML.
4. retirar brillos, pulsos y adornos animados que no aportaban información.
5. Unificar el tratamiento visual de las páginas legal y 404 sin alterar sus puntos de ruptura ni su estructura.

No se cambiaron productos, textos comerciales, precios, dirección, teléfono, rutas, destinos, reglas del menú, scripts funcionales ni lógica de formularios.

## 2. Diagnóstico — Fase 1

### 2.1 Stack y arquitectura

| Área | Hallazgo |
|---|---|
| Presentación | HTML estático en `index.html`, `legal.html` y `404.html` |
| Estilos principales | Reglas base integradas en `index.html` y refinamientos en `assets/kenia-v2.css` |
| JavaScript | Lógica inline en `index.html`; módulos externos `lazy-images.js` y `privacy.js` |
| Componentes UI | Marcado propio y componentes nativos HTML (`dialog`, `details`, `button`, `form`) |
| Iconos | Sprite SVG embebido en la página principal |
| Imágenes | PNG/JPG locales en `assets/` |
| Tipografías | No se encontraron archivos de fuente local ni dependencias de fuentes externas |
| Configuración de build | No hay `package.json`, bundler, pipeline Tailwind o configuración de compilación |
| Pruebas | No se encontró suite automatizada ni script de lint/type-check/build |

### 2.2 Activos de marca comprobados

- `assets/logo.png`: lettering rojo “Kenia” y espigas doradas, activo central de identidad.
- `assets/rosas.jpg`, `gabriela.jpg`, `titanic.jpg` y `latte.jpg`: fotografías de pastelería/productos ya utilizadas en el sitio.
- `assets/menu.jpg`: fotografía de la carta de brunch.
- `assets/favicon.png`: icono del sitio.

No se añadieron fotografías de stock ni se sustituyeron los recursos originales.

### 2.3 Hallazgos clasificados

| Gravedad | Evidencia | Efecto | Solución aplicada |
|---|---|---|---|
| ALTO | Tokens repetidos en el `:root` inline de `index.html` y en `assets/kenia-v2.css`; las páginas secundarias tenían paletas locales propias | Varias fuentes de verdad y riesgo de divergencia | Se creó `assets/kenia-tokens.css` y se retiraron las definiciones duplicadas de tokens; los estilos de imagen `--img-*` permanecen separados porque son referencias de recursos |
| ALTO | `assets/kenia-v2.css` apuntaba a `.review-wrap`, mientras el HTML usa `.t-wrap` en `index.html` | El estilo editorial de reseñas no afectaba al contenedor existente; permanecía el tratamiento pesado de la regla base | Se corrigió el selector a `.t-wrap` y se aplicó una superficie abierta con divisores |
| MEDIO | `--font-display` estaba definido como sans-serif UI; todos los encabezados heredaban ese carácter | Jerarquía plana y poco vínculo con la identidad artesanal | Georgia para display/editorial y pila de sistema para lectura funcional |
| MEDIO | `.btn::after`, `.btn-giant` y `.fab::before` conservaban brillo, pulso y halo animados | Movimiento repetitivo que compite con el contenido | Desactivados los tres efectos; se conserva el feedback breve de botones |
| MEDIO | Pseudoelementos decorativos en `.reviews`, `.contact` y `.site-footer` mantenían círculos, trama y franja multicolor | Decoración residual sin función informativa | Se retiraron esos pseudoelementos en las superficies indicadas |
| MEDIO | `legal.html` usaba blur, tarjetas con radios grandes y una tipografía propia; `404.html` usaba Arial, arcos muy redondeados y sombras distintas | La navegación entre páginas rompía la continuidad visual | Nueva hoja compartida, acotada a `.legal-page` y `.error-page` |
| BAJO | `.footer-brand .wordmark` y su variante `.wheat-mini` no tenían correspondencia en el footer HTML ni en JavaScript | Reglas residuales de una versión anterior | Retiradas tras comprobar que no tenían referencias en el marcado ni scripts |
| BAJO | `body { overflow-x: hidden; }` en la hoja base puede ocultar un overflow en lugar de resolver su causa | Riesgo potencial ante futuros contenidos | No se altera en esta intervención para no cambiar el comportamiento; revisar si se incorporan módulos nuevos |

### 2.4 Riesgos y límites detectados

- El formulario valida en el navegador y prepara un mensaje para WhatsApp; no hay endpoint, base de datos, rate limiting ni almacenamiento propio de pedidos.
- Las preferencias opcionales se guardan en `localStorage`. No hay proveedor de analítica ni publicidad conectado.
- Google Maps se crea tras una acción explícita del visitante.
- `legal.html` contiene marcadores `[PENDIENTE]` para datos del responsable, canales de privacidad y condiciones comerciales. No deben publicarse sin completar y validar esos datos con el titular.
- `404.html` necesita configuración del hosting/CDN para devolver el código HTTP 404 real.
- El overflow horizontal se limita desde CSS global. Conviene vigilarlo al incorporar contenido futuro.

## 3. Dirección de arte — Fase 2

### Personalidad

Pastelería artesanal, familiar y comercial, con presentación cuidada. La fotografía de producto y el logotipo deben dominar; la interfaz actúa como soporte. Se evita la estética SaaS, el dark mode generalizado, el glassmorphism, los gradientes multicolor y las tarjetas universales.

### Tokens globales

Definidos en `assets/kenia-tokens.css`:

| Token | Valor | Rol |
|---|---|---|
| `--red` | `#C8102E` | CTA, enlaces y énfasis |
| `--red-dark` | `#9E0C24` | Hover/activo |
| `--gold` | `#D4AF37` | Acento decorativo |
| `--gold-deep` | `#805B0D` | Acento con mayor contraste |
| `--cream` | `#FFFDF9` | Fondo principal |
| `--cream-2` | `#F7F0E6` | Superficie secundaria |
| `--ink` | `#312521` | Texto principal |
| `--ink-soft` | `#68554E` | Texto secundario |
| `--cocoa` | `#35201B` | Contacto y contraste |
| `--wa` | `#137A3F` | Acción de WhatsApp |

El dorado claro no se usa como texto pequeño sobre crema. Para textos y focos se recurre a `--gold-deep`.

### Tipografía y composición

- Display/editorial: Georgia, serif, con tracking moderado y peso 600.
- Interfaz: pila local system-ui, sin solicitudes a Google Fonts.
- El logotipo continúa siendo el archivo original.
- Las imágenes mantienen un papel protagonista; se reducen contenedores, sombras y decoración sobrante.
- Las páginas secundarias consumen los mismos tokens y utilizan `assets/kenia-secondary-pages.css` con selectores limitados a sus clases de página.

## 4. Ejecución — Fase 3

### Archivos modificados

| Archivo | Cambio |
|---|---|
| `assets/kenia-tokens.css` | Nuevo archivo: fuente única de tokens cromáticos, tipográficos y de geometría |
| `assets/kenia-v2.css` | Retirado el `:root` duplicado; jerarquía serif; selector `.t-wrap` corregido; brillos, pulsos y adornos redundantes desactivados |
| `assets/kenia-secondary-pages.css` | Nuevo archivo compartido para coherencia visual de página legal y 404 |
| `index.html` | Enlace a tokens compartidos; retirada de tokens duplicados; lógica JavaScript y marcado funcional sin cambios |
| `legal.html` | Tokens compartidos, clase de página y hoja visual compartida; marcado y contenido legal conservados |
| `404.html` | Tokens compartidos, clase de página y hoja visual compartida; navegación y puntos de ruptura conservados |
| `design.md` | Documentado el sistema de diseño implementado |
| `README.md` | Inventario de recursos actualizado |
| `AUDITORIA.md` | Este informe, con alcance y verificación |

### Funcionalidades preservadas por alcance del cambio

No se modificaron los bloques JavaScript de negocio ni los módulos externos. Permanecen en el proyecto:

- Navegación principal y menú móvil.
- Estados activos por sección.
- Visor ampliado del portafolio.
- Pestañas del menú de brunch y navegación por teclado.
- Carrusel de reseñas.
- Validación del formulario y generación del mensaje de WhatsApp.
- Aviso y diálogo de preferencias de privacidad.
- Carga diferida de fotografías.
- Inserción del mapa tras la acción del usuario.

Los puntos de ruptura existentes se conservaron. No se añadieron reglas de columnas, orden, visibilidad o navegación que reestructuren el diseño responsive.

## 5. Validación ejecutada en este entorno

| Comprobación | Resultado |
|---|---|
| `node --check` sobre scripts inline extraídos de las tres páginas HTML | Correcto |
| `node --check` sobre `assets/lazy-images.js` y `assets/privacy.js` | Correcto |
| Parseo CSS con `tinycss2` | Correcto: 0 errores en las hojas CSS y estilos integrados inspeccionados |
| Parseo de documentos, JSON-LD y comprobación de IDs | Los tres documentos se parsearon con lxml; JSON-LD válido y sin IDs duplicados |
| Referencias locales a assets, fragmentos, labels y ARIA | Sin referencias locales rotas; labels y referencias ARIA comprobadas; los enlaces entre páginas también resuelven |
| Build, lint, type-check y tests | No disponibles: el repositorio no contiene `package.json`, configuración de build ni suite de pruebas |
| Revisión visual con navegador | No completada: Chromium devolvió `ERR_BLOCKED_BY_ADMINISTRATOR` al intentar abrir tanto la dirección local como el archivo local |
| Prueba visual real en 1440, 1280, 1024, 768, 390 y 360 px | No verificable en esta sesión por el bloqueo del navegador; las reglas `@media` existentes no se modificaron |

No se declara una validación visual ni una prueba funcional de navegador como completada. El archivo `AUDITORIA.md` de la versión recibida contenía resultados de pruebas anteriores; no se han presentado como pruebas repetidas en esta ejecución.

Se calcularon además relaciones de contraste para combinaciones principales: texto `#312521` sobre crema `#FFFDF9` (14,59:1), texto secundario `#68554E` sobre crema (6,89:1), oro profundo `#805B0D` sobre crema (6,04:1), blanco sobre rojo Kenia (5,88:1), texto claro `#E8DAD0` sobre cacao (11,19:1) e icono blanco sobre verde WhatsApp `#137A3F` (5,41:1). Son cálculos sobre los colores declarados, no sustituyen una inspección de todos los estados reales de la interfaz.

## 6. Pendientes antes de publicar

1. Completar todos los `[PENDIENTE]` de `legal.html` y obtener aprobación del responsable.
2. Confirmar vigencia de dirección y WhatsApp, así como autorizaciones de uso del logotipo y fotografías.
3. Revisar el sitio desde el hosting definitivo y verificar navegación, formularios, preferencias, mapa y respuesta HTTP 404.
4. Ejecutar pruebas visuales en los seis anchos objetivo y revisar teclado/lector de pantalla en navegador real.
5. Configurar HTTPS, cabeceras, caché, CSP y protección antispam en infraestructura, según corresponda.

## 7. Despliegue

Publicar toda la carpeta conservando la estructura de `assets/`. Configurar `404.html` en el servidor/CDN. La web sigue siendo estática y no se ha añadido backend ni dependencia de terceros.
