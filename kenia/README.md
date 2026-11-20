# Panadería y Pastelería Kenia — sitio web v2

## Archivos
- `index.html`: landing principal.
- `legal.html`: privacidad, cookies, términos, cambios/cancelaciones y aviso legal (incluye campos pendientes).
- `404.html`: documento de error para configurar en el hosting.
- `assets/`: imágenes originales separadas, favicon, tokens globales (`kenia-tokens.css`), CSS principal (`kenia-v2.css`), estilos compartidos de páginas secundarias (`kenia-secondary-pages.css`) y módulos ligeros para carga diferida (`lazy-images.js`) y preferencias de privacidad (`privacy.js`).
- `design.md`: sistema de diseño y decisiones.
- `AUDITORIA.md`: mejoras, límites y verificaciones realizadas.

## Despliegue
Sube **todos** los archivos y conserva la estructura de carpetas. Configura el hosting para utilizar `404.html` como documento de error HTTP 404. No basta con abrir esta página mediante JavaScript: el servidor/CDN debe responder con estado 404.

Antes de publicar, completa todos los campos `[PENDIENTE]` de `legal.html` y valida la política con el responsable del negocio. No se conoce la razón social/NIT ni el correo de privacidad, así que se han dejado marcadores explícitos.

## Configuración del negocio
El número de WhatsApp y la dirección se conservan de la versión original:
- WhatsApp: `573227646484`
- Dirección comercial: `Cl. 39 Bis Sur #72J-62, Bogotá, Colombia`

Los productos, combos y categorías del menú se mantienen en el JavaScript original de `index.html`.

## Formulario
El formulario valida los campos en el navegador, solicita autorización de tratamiento y compone el mensaje para WhatsApp. No envía los datos a un servidor propio ni confirma pedidos/pagos. Para disponer de evidencia verificable de autorización, almacenamiento, rate limiting y protección antispam de servidor, se necesita implementar una infraestructura autorizada por el titular.
