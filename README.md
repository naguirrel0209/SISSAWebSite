# Corporación SIS — Sitio institucional

Sitio institucional de **Corporación SIS**, empresa guatemalteca de seguridad privada. La aplicación presenta la identidad corporativa, el Sistema Integral de Seguridad, oportunidades laborales, canales de contacto y formularios institucionales.

Estado actual: **versión 1.0 lista para producción**. El proyecto está preparado para funcionar como SPA estática en GitHub Pages bajo la base técnica `/SISSAWebSite/`.

URL objetivo:

```text
https://naguirrel0209.github.io/SISSAWebSite/
```

> Nota importante: la marca visible debe mantenerse como **Corporación SIS**. El nombre técnico **SISSAWebSite** no debe cambiarse porque forma parte de la URL y de la configuración de GitHub Pages.

---

## Stack tecnológico

| Capa | Tecnología |
| --- | --- |
| UI | React 19 |
| Build/dev server | Vite 8 |
| Routing | React Router |
| Estilos | Tailwind CSS 4 |
| Animaciones | Framer Motion |
| Iconografía | Lucide React |
| Formularios | EmailJS |
| Hosting objetivo | GitHub Pages |

El proyecto es una SPA client-side servida como archivos estáticos. No utiliza backend propio.

---

## Requisitos

- Node.js 20 LTS recomendado.
- npm.
- Carpeta `Recursos/` presente en la raíz del proyecto, porque varias imágenes se importan desde ahí durante el build.

---

## Instalación local

```bash
npm install
npm run dev
```

Por la configuración de Vite, el servidor local se sirve con la base:

```text
http://localhost:5173/SISSAWebSite/
```

Si Vite asigna otro puerto, usar la URL que imprime la terminal.

---

## Scripts disponibles

| Script | Uso |
| --- | --- |
| `npm run dev` | Levanta el entorno local con Vite |
| `npm run build` | Genera el build de producción en `dist/` |
| `npm run preview` | Sirve localmente el build generado |

No hay script de lint o test configurado actualmente.

---

## Rutas públicas

| Ruta | Descripción |
| --- | --- |
| `/` | Inicio |
| `/nosotros` | Perfil institucional |
| `/servicios` | Sistema Integral de Seguridad, medios, proceso y galería operacional |
| `/servicios/medios-humanos` | Detalle de medios humanos |
| `/servicios/medios-tecnicos-activos` | Detalle de medios técnicos activos |
| `/servicios/medios-tecnicos-pasivos` | Detalle de medios técnicos pasivos |
| `/servicios/medios-organizativos` | Detalle de medios organizativos |
| `/oportunidades` | Oportunidades laborales y formulario de postulación |
| `/contacto` | Canales institucionales, formulario y ubicación |
| `/operaciones` | Redirect interno hacia `/servicios` |
| `*` | Página 404 personalizada |

Todas las páginas principales se cargan con `React.lazy()` dentro de `Suspense`.

---

## Estructura principal

```text
sis-sa-prototipo/
├── .github/workflows/deploy.yml
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── site.webmanifest
│   └── images/
│       └── brand/
├── Recursos/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── components/
│   │   ├── cards/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── sections/
│   │   └── ui/
│   ├── constants/
│   │   └── site.js
│   ├── data/
│   │   ├── media.js
│   │   ├── operations.js
│   │   └── securityMeans.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Nosotros.jsx
│   │   ├── Servicios.jsx
│   │   ├── MedioDetalle.jsx
│   │   ├── Oportunidades.jsx
│   │   ├── Contact.jsx
│   │   └── NotFound.jsx
│   ├── services/
│   │   └── emailjs.js
│   └── styles/
│       └── global.css
├── index.html
├── package.json
└── vite.config.js
```

---

## Configuración importante

### GitHub Pages

`vite.config.js` mantiene:

```js
base: '/SISSAWebSite/'
```

No cambiar esta base a `/` salvo que el proyecto deje de publicarse en GitHub Pages dentro del repositorio `SISSAWebSite`.

`src/main.jsx` usa:

```jsx
<BrowserRouter basename="/SISSAWebSite">
```

La workflow de GitHub Pages copia `dist/index.html` como `dist/404.html` para permitir refresh directo en rutas internas de la SPA.

### EmailJS

Los formularios usan EmailJS mediante variables de entorno:

```env
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

No hardcodear credenciales en el código. `.env` está ignorado por Git.

### Datos institucionales

La información global vive en:

```text
src/constants/site.js
```

Ahí se centralizan:

- Nombre visible.
- URL de producción.
- Logo público.
- Teléfono.
- Correo.
- Dirección.
- Navegación.
- Metadata base por página.

---

## SEO, manifest y assets

El sitio incluye:

- `<title>` y meta description por ruta.
- Canonical dinámico.
- Open Graph.
- Twitter Card.
- JSON-LD `Organization`.
- `robots.txt` con sitemap absoluto.
- `sitemap.xml` con rutas públicas principales.
- Manifest compatible con GitHub Pages.
- Favicon/logo usando rutas bajo `%BASE_URL%`.

El logo público principal es:

```text
public/images/brand/logo-sis.png
```

Actualmente está optimizado como PNG 512x512 para evitar cargar un asset demasiado pesado desde manifest/favicon/metadata.

---

## Accesibilidad y responsive

El proyecto incluye:

- `lang="es-GT"`.
- Skip link hacia contenido principal.
- Estados `focus-visible`.
- Menú móvil con `aria-expanded`, `aria-controls` y cierre con `Escape`.
- Dropdown de Servicios accesible por hover y focus.
- Formularios con labels, validación básica y mensajes de error.
- `aria-live` para estados de envío.
- `prefers-reduced-motion` para reducir animaciones.
- Imágenes relevantes con `alt` descriptivo; imágenes decorativas con `alt=""`.

Se validaron localmente las rutas principales bajo `/SISSAWebSite/` y los assets públicos críticos (`logo`, `manifest`, `robots`, `sitemap`) con respuesta `200`.

---

## Formularios

### Contacto

Ruta:

```text
/contacto
```

Incluye:

- Nombre.
- Empresa.
- Correo electrónico.
- Teléfono.
- Tipo de servicio.
- Mensaje.
- Estado de envío.
- Mensaje de éxito/error.
- Honeypot básico.

### Oportunidades laborales

Ruta:

```text
/oportunidades
```

Incluye:

- Nombre.
- Apellido.
- Correo electrónico.
- Teléfono.
- Mensaje/requerimiento laboral.
- Botón de WhatsApp con mensaje prellenado.
- Sin carga de PDF/CV por ahora.

La carga de PDF/CV queda pendiente porque requiere una estrategia distinta a EmailJS básico o un backend/storage.

---

## Estilo visual

La identidad actual es institucional, sobria y tecnológica, con fondo oscuro, acentos azules y tarjetas con apariencia premium.

Los estilos principales están en:

```text
src/styles/global.css
```

Tailwind CSS 4 se configura mediante `@theme`. No existe `tailwind.config.js`.

---

## Buenas prácticas para cambios futuros

- Mantener la marca visible como **Corporación SIS**.
- No cambiar `SISSAWebSite` en rutas técnicas.
- No duplicar datos institucionales fuera de `src/constants/site.js` si pueden centralizarse.
- No introducir dependencias nuevas salvo que sean necesarias.
- No rediseñar páginas completas si el cambio solicitado es puntual.
- Ejecutar siempre `npm run build` antes de considerar lista una modificación.
- Revisar que no existan referencias visibles a `SIS S.A.` salvo que formen parte de una imagen original no editable.

---

## Pendientes recomendados

- Agregar ESLint/Prettier si se quiere estandarizar mantenimiento.
- Agregar pruebas básicas de rutas/componentes.
- Evaluar backend o storage si se desea subir CV en PDF.
- Generar un `og:image` visual específico en vez de usar el logo.
- Optimizar progresivamente imágenes grandes importadas desde `Recursos/`.
- Revisar si conviene migrar más assets necesarios desde `Recursos/` hacia `public/images/`.

---

## Licencia

Uso interno de **Corporación SIS**. Sin licencia open-source definida.
