# Sistema de diseño — Panadería y Pastelería Kenia

**Versión:** 2.1 · **Idioma:** es-CO · **Base:** HTML, CSS y JavaScript nativos.

## Dirección de arte

Kenia conserva como activo principal su logotipo original: lettering rojo, espigas doradas y remates ornamentales. La interfaz acompaña esa identidad con una estética de pastelería artesanal editorial: cálida, clara y ordenada. La fotografía real del producto lleva el peso visual; los contenedores, adornos y movimientos se mantienen en segundo plano.

La referencia de Hartzler Family Dairy mencionada en la documentación de origen aporta únicamente principios de composición, espacio negativo y protagonismo fotográfico. No se trasladan su identidad ni sus colores.

## Tokens cromáticos

| Rol | Valor | Uso |
|---|---|---|
| Rojo Kenia (`--red`) | `#C8102E` | Acción principal, enlaces y énfasis |
| Rojo profundo (`--red-dark`) | `#9E0C24` | Hover y estados activos |
| Oro (`--gold`) | `#D4AF37` | Líneas, espigas y detalles decorativos |
| Oro profundo (`--gold-deep`) | `#805B0D` | Texto/acento que requiere más contraste |
| Crema (`--cream`) | `#FFFDF9` | Fondo principal |
| Crema secundaria (`--cream-2`) | `#F7F0E6` | Secciones y superficies de apoyo |
| Tinta (`--ink`) | `#312521` | Texto principal |
| Tinta suave (`--ink-soft`) | `#68554E` | Texto secundario |
| Cacao (`--cocoa`) | `#35201B` | Bloque de contacto y contraste |
| WhatsApp (`--wa`) | `#137A3F` | Acción de contacto externa |

El oro claro se reserva para ornamentación y no para párrafos pequeños. Para textos y focos se utiliza oro profundo. El blanco se mantiene como superficie limpia para formulario y portafolio.

## Tipografía

- **Titulares/editorial:** `Georgia, "Times New Roman", serif`; peso 600, tracking moderado y alturas de línea entre 1.02 y 1.15 según escala.
- **Interfaz y lectura:** pila local `system-ui`, `-apple-system`, `BlinkMacSystemFont`, `"Segoe UI"`, `Roboto`, sans-serif.
- **Palabras expresivas:** Georgia cursiva. No se simula una fuente manuscrita que no esté disponible.
- **Logotipo:** archivo original `assets/logo.png`; no se recompone ni sustituye.

No se descargan fuentes externas ni se incorporan archivos tipográficos sin licencia verificada.

## Composición y componentes

- **Header:** fondo crema opaco, línea inferior discreta y navegación sencilla. Sin vidrio ni desenfoque permanente.
- **Hero:** titular serif específico, fotografía original del pastel como protagonista y acciones diferenciadas.
- **Oferta:** imágenes a escala, contenido abierto y divisores; no se elevan todas las columnas como tarjetas.
- **Portafolio:** fotografías originales con pies de foto legibles y visor ampliado accesible.
- **Brunch:** superficie crema secundaria, pestañas funcionales y listado de productos sin añadir precios ni elementos no documentados.
- **Opiniones:** bloque editorial abierto; se evita la tarjeta con sombra pesada.
- **FAQ:** `details/summary` nativo.
- **Contacto:** superficie cacao, CTA claro y formulario blanco; se conserva la validación del navegador y la apertura de WhatsApp.
- **Visítanos:** información comercial abierta junto al espacio del mapa; el iframe solo se crea tras la acción de cargarlo.
- **Páginas secundarias:** hoja compartida `assets/kenia-secondary-pages.css`, acotada a `legal-page` y `error-page`.
- **Footer:** superficie blanca en la página principal y cacao en las páginas secundarias, con la paleta compartida.

## Geometría y ritmo

- Unidad base: 4 px.
- Contenedor principal: máximo 1240 px; gutters fluidos existentes.
- Secciones: `clamp(4rem, 8vw, 7rem)` en el sistema principal.
- Botones: forma pill; superficies funcionales con radios discretos.
- Bordes: líneas cálidas y finas. Las sombras se reservan para elementos que necesitan separación real.
- Se eliminan brillos y pulsos permanentes que compiten con el contenido.

## Responsive

Se conservan los breakpoints y las reglas `@media` del proyecto original. La intervención de esta versión no cambia el número de columnas, el orden, la visibilidad, la navegación móvil ni los puntos de ruptura de `index.html`, `legal.html` o `404.html`.

## Movimiento y accesibilidad

- Transiciones de interacción breves y específicas.
- Revelado de secciones limitado a 420 ms; el resto de la interfaz no depende de animaciones para comunicar información.
- Se eliminan shimmer, pulso continuo y halo animado del botón flotante.
- `prefers-reduced-motion` se conserva en las tres páginas.
- Se mantienen `:focus-visible`, controles nativos, `summary`, `dialog`, labels y atributos ARIA existentes.

## Privacidad, terceros y operación

- No hay Google Analytics, Meta Pixel ni rastreadores integrados.
- La preferencia se guarda localmente en el navegador.
- Google Maps solo se inserta tras pulsar el control correspondiente.
- WhatsApp se abre únicamente por acción del visitante.
- El formulario no envía datos a un servidor propio ni confirma pedidos o pagos.

## Recursos

Se conservan las fotografías entregadas (`rosas.jpg`, `gabriela.jpg`, `titanic.jpg`, `latte.jpg`, `menu.jpg`), el logotipo y el favicon originales. No se añaden imágenes de stock ni métricas, reseñas, productos o promesas nuevas.
