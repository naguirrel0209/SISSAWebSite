# AGENTS.md — Guía para agentes en SISSAWebSite

Este repositorio contiene el sitio institucional de **Corporación SIS**. Cualquier agente que trabaje aquí debe priorizar estabilidad, compatibilidad con GitHub Pages y preservación de la identidad visual actual.

## Reglas principales

1. No hacer `git add`, `git commit` ni `git push` salvo que el usuario lo pida explícitamente en el turno actual.
2. Mantener la marca visible como **Corporación SIS**.
3. No cambiar el nombre técnico **SISSAWebSite**, porque forma parte de la URL, `vite.config.js` y `BrowserRouter`.
4. No rediseñar el sitio completo si el usuario pidió un ajuste puntual.
5. No instalar dependencias nuevas salvo necesidad clara.
6. Ejecutar `npm run build` después de cambios de código o configuración.
7. Preservar cambios locales existentes del usuario; no usar comandos destructivos como `git reset --hard`.

## Contexto técnico

- React 19.
- Vite 8.
- React Router.
- Tailwind CSS 4.
- Framer Motion.
- Lucide React.
- EmailJS.
- GitHub Pages.

La base de producción es:

```js
base: '/SISSAWebSite/'
```

El router usa:

```jsx
<BrowserRouter basename="/SISSAWebSite">
```

La URL objetivo es:

```text
https://naguirrel0209.github.io/SISSAWebSite/
```

## Rutas públicas esperadas

- `/`
- `/nosotros`
- `/servicios`
- `/servicios/medios-humanos`
- `/servicios/medios-tecnicos-activos`
- `/servicios/medios-tecnicos-pasivos`
- `/servicios/medios-organizativos`
- `/oportunidades`
- `/contacto`
- `/operaciones` redirige hacia `/servicios`
- `*` muestra la página 404

## Archivos clave

- `src/constants/site.js`: datos institucionales, navegación y metadata.
- `src/data/media.js`: imágenes centralizadas.
- `src/data/securityMeans.js`: contenido de los cuatro medios.
- `src/data/operations.js`: proceso y galería operacional.
- `src/components/layout/Navbar.jsx`: navegación principal y dropdown de Servicios.
- `src/components/layout/Seo.jsx`: metadata, canonical, Open Graph, Twitter Card y JSON-LD.
- `src/pages/Servicios.jsx`: página principal del Sistema Integral de Seguridad.
- `src/pages/MedioDetalle.jsx`: páginas internas de medios.
- `src/pages/Oportunidades.jsx`: página laboral y formulario de postulación.
- `src/pages/Contact.jsx`: formulario/contacto/mapa.
- `public/site.webmanifest`, `public/robots.txt`, `public/sitemap.xml`: SEO/PWA.
- `.github/workflows/deploy.yml`: GitHub Pages.

## Formularios

Los formularios usan EmailJS con:

```env
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

No hardcodear credenciales. `.env` debe permanecer fuera de Git.

No implementar carga de PDF/CV sin confirmar estrategia de backend/storage.

## SEO y assets

- Mantener canonical y rutas absolutas apuntando a `https://naguirrel0209.github.io/SISSAWebSite/`.
- No incluir `/operaciones` en sitemap como ruta independiente.
- No usar rutas absolutas tipo `/images/...` en `index.html`; usar `%BASE_URL%` cuando aplique.
- El logo público actual es `public/images/brand/logo-sis.png`.

## Criterio de aceptación antes de entregar

Antes de finalizar cambios técnicos:

```bash
npm run build
```

Si no existe lint configurado, indicarlo brevemente y no inventar un comando.

También es recomendable verificar:

```bash
rg "SIS S\\.A\\.|SIS S.A." src public index.html README.md
git status --short
```

## Estilo de trabajo

- Usar cambios pequeños y seguros.
- Explicar al usuario qué se cambió y qué quedó pendiente.
- Si hay duda entre tocar diseño o mantenerlo, mantenerlo.
- Priorizar: no romper funcionalidad, GitHub Pages, responsive, accesibilidad, SEO, performance y limpieza.
