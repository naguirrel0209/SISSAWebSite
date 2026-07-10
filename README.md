# SIS S.A. — Sitio institucional

Prototipo del sitio institucional de **SIS S.A. / Corporación SIS**, empresa de seguridad privada con presencia en Guatemala. El sitio presenta la oferta de servicios, la capacidad operativa, el perfil institucional y los canales de contacto.

> Estado: **Prototipo en desarrollo**. El formulario de contacto aún no realiza envíos reales y la integración con Google Maps está pendiente.

---

## Tabla de contenido

1. [Stack tecnológico](#stack-tecnológico)
2. [Requisitos previos](#requisitos-previos)
3. [Instalación](#instalación)
4. [Scripts disponibles](#scripts-disponibles)
5. [Estructura del proyecto](#estructura-del-proyecto)
6. [Configuración](#configuración)
7. [Datos y contenido](#datos-y-contenido)
8. [Estilos y diseño](#estilos-y-diseño)
9. [SEO y PWA](#seo-y-pwa)
10. [Accesibilidad](#accesibilidad)
11. [Notas importantes](#notas-importantes)
12. [Roadmap pendiente](#roadmap-pendiente)
13. [Licencia](#licencia)

---

## Stack tecnológico

| Capa | Tecnología | Versión |
| --- | --- | --- |
| Framework UI | React | 19.2 |
| Bundler / Dev server | Vite | 8 |
| Estilos | TailwindCSS | 4 (vía `@tailwindcss/vite`) |
| Enrutado | react-router-dom | 7.16 |
| Animaciones | framer-motion | 12 |
| Iconografía | lucide-react | 1.17 |
| Tipografía | Sora (Google Fonts) | — |

El proyecto no usa TypeScript ni framework meta (Next/Remix): es una SPA client-siderender servida como archivos estáticos.

---

## Requisitos previos

- **Node.js** ≥ 18.20 (recomendado 20 LTS o superior)
- **npm** ≥ 10 (incluido con Node)
- Acceso a la carpeta `Recursos/` en la raíz del proyecto (ver [Notas importantes](#notas-importantes))

---

## Instalación

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd sis-sa-prototipo

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

El sitio quedará disponible en `http://localhost:5173` (puerto default de Vite).

---

## Scripts disponibles

Definidos en `package.json`:

| Script | Acción |
| --- | --- |
| `npm run dev` | Inicia Vite en modo desarrollo con HMR |
| `npm run build` | Genera el build de producción en `dist/` |
| `npm run preview` | Sirve el build de producción localmente para verificación |

> **Pendiente**: no existen aún scripts de `lint`, `format` ni `test`. Ver [Roadmap](#roadmap-pendiente).

---

## Estructura del proyecto

```
sis-sa-prototipo/
├── Recursos/                    # Imágenes originales del cliente (NO ignoradas)
├── dist/                        # Build de producción (ignorado)
├── node_modules/                # Dependencias (ignorado)
├── outputs/                     # Salidas temporales (ignorado)
├── work/                        # Trabajo temporal (ignorado)
├── public/                      # Recursos estáticos servidos tal cual
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── site.webmanifest
│   └── images/
│       ├── brand/               # Logos en PNG/JPEG
│       └── operations/          # Fotos operativas
└── src/
    ├── main.jsx                 # Punto de montaje (StrictMode + BrowserRouter)
    ├── App.jsx                  # Definición de rutas + Suspense + Layout
    ├── constants/
    │   └── site.js              # Datos institucionales, NAV_ITEMS, PAGE_META
    ├── data/
    │   ├── media.js             # Imports de imágenes desde Recursos/ + export
    │   └── operations.js       # Datos de la página /operaciones
    ├── styles/
    │   └── global.css           # Tailwind v4 + @theme tokens + CSS custom
    ├── components/
    │   ├── layout/              # Layout, Navbar, Footer, Seo
    │   ├── navigation/          # ScrollToTop
    │   ├── sections/           # CallToAction, PageHeader
    │   ├── cards/               # FeatureCard
    │   └── ui/                  # Badge, ButtonLink, SectionHeader,
    │                            # AssetPlaceholder, AssetImage, RouteLoader
    └── pages/
        ├── Home.jsx             # /
        ├── Nosotros.jsx         # /nosotros
        ├── Servicios.jsx        # /servicios
        ├── Operations.jsx       # /operaciones
        ├── Contact.jsx         # /contacto
        └── NotFound.jsx         # *
```

### Rutas

| Ruta | Componente | Descripción |
| --- | --- | --- |
| `/` | `Home` | Hero, soluciones, disciplina operativa, trust strip, CTA |
| `/nosotros` | `Nosotros` | Perfil, infraestructura, uniformes, valores |
| `/servicios` | `Servicios` | Servicios especializados, metodología, sectores, trust signals |
| `/operaciones` | `Operations` | Capacidad operativa con fotos reales |
| `/contacto` | `Contact` | Canales directos, formulario, disponibilidad, ubicación |
| `*` | `NotFound` | 404 personalizado |

Todas las páginas se cargan de forma perezosa con `React.lazy()` bajo un único `<Suspense fallback={<RouteLoader />}`. El `Layout` (Navbar + Footer + skip-link) se aplica como route layout con `<Outlet />`.

---

## Configuración

### Variables de entorno

Actualmente el proyecto **no consume variables de entorno**. Cuando se integre el envío del formulario o Google Maps, recomendamos crear:

```bash
# .env.example (aún no existe)
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
VITE_GOOGLE_MAPS_API_KEY=
```

> Importante: Vite expone al cliente las variables con prefijo `VITE_`. Nunca pongas secretos de backend en estas variables: cualquier cosa bundleada es visible en el build final. Para secretos reales se necesita un endpoint backend.

### Datos institucionales

Editar `src/constants/site.js`:

```js
export const SITE = {
  name: 'SIS S.A.',
  legalName: 'Corporación SIS',
  title: 'SIS S.A. | Seguridad estratégica',
  description: '...',
  phone: '2323-0303',
  phoneHref: 'tel:23230303',
  email: 'recepcion@corporacionsis.com',
  emailHref: 'mailto:recepcion@corporacionsis.com',
  address: '14 Av A 6-68, Mixco, Guatemala',
};
```

Aquí también se definen `NAV_ITEMS` (items de navegación) y `PAGE_META` (títulos y descripciones SEO por ruta). **Toda navegación debe generarse desde `NAV_ITEMS`** para mantener la fuente de verdad única.

---

## Datos y contenido

El contenido vive en dos lugares:

1. **`src/constants/site.js`** — datos institucionales globales y navegación.
2. **`src/data/`** — datos estructurados consumidos por las páginas:
   - `media.js` — centraliza los imports de imágenes y construye objetos con `src`, `alt` y `objectPosition` para `AssetImage`. Toda imagen del sitio debe pasar por aquí para reutilización y manejo de alt text accesible.
   - `operations.js` — datos de la página `/operaciones`.

> **Trabajo pendiente**: extraer a `src/data/` la lista de servicios, sectores, infraestructura, uniformes, valores y opciones del formulario. Actualmente varios arrays están duplicados entre `Home.jsx` y `Servicios.jsx` con copys distintos (ver [Roadmap](#roadmap-pendiente)).

---

## Estilos y diseño

### TailwindCSS v4

La configuración se hace en `src/styles/global.css` mediante `@theme`. No existe `tailwind.config.js`: Tailwind v4 detecta los tokens del bloque `@theme` y genera utilities automáticamente.

Tokens de color (modo claro):

| Token | Hex | Uso |
| --- | --- | --- |
| `--color-background` | `#efe7da` | Fondo base (beige) |
| `--color-surface` | `#f7f2e8` | Superficies (paneles) |
| `--color-surface-high` | `#e5d8c5` | Superficies elevadas |
| `--color-surface-highest` | `#d6c3a8` | Superficies más elevadas |
| `--color-primary-cyan` | `#9b7438` | Acento principal (dorado/bronce) |
| `--color-primary-cyan-bright` | `#c89b49` | Acento brillante |
| `--color-text` | `#17201c` | Texto principal |
| `--color-muted-text` | `#6b746d` | Texto secundario |
| `--color-border-cyber` | `#c8b89f` | Bordes |

> **Nota**: los nombres de tokens (`primary-cyan`, `border-cyber`, `shadow-command`) son heredados de la versión dark del prototipo. Aunque los valores ya son dorado/beige, los nombres siguen diciendo "cian". Pendiente renombrar para coherencia.

### CSS custom

Además de las utilities de Tailwind, `global.css` define clases de componentes reutilizables con CSS plano:

- `.section-shell` — contenedor central `max-width: 72rem`
- `.glass-panel` — panel con `backdrop-filter` y borde translúcido
- `.eyebrow` — texto "kicker" superior (uppercase, tracking 0.18em)
- `.icon-frame` — marco cuadrado para iconos
- `.asset-placeholder` — placeholder para imágenes pendientes
- `.interactive-card` — hover con `translateY` + borde + sombra
- `.btn-primary` / `.btn-secondary` — botones completos
- `.route-loader` — spinner del `RouteLoader`
- `.skip-link` — enlace de accesibilidad "saltar al contenido"

> **Pendiente**: existe duplicación entre los tokens `@theme` (`--color-*`) y las variables `:root --app-*`. Las clases custom leen `--app-*`, las utilities leen `--color-*`. Conviene unificar a `--color-*` para mantener una sola fuente de verdad.

### Patrones Tailwind frecuentes

- Opacidad con slash: `bg-surface/48`, `border-primary-cyan/35`
- Grid templates arbitrarias: `md:grid-cols-[0.42fr_1fr]`, `lg:grid-cols-[0.68fr_1.32fr]`
- `min-h-[calc(100vh-5rem)]` en el hero de Home (full viewport menos navbar)
- `backdrop-blur-xl` extensivo (navbar, footer, cards)

---

## SEO y PWA

### SEO

- Componente `src/components/layout/Seo.jsx` actualiza `document.title` y `<meta name="description">` por ruta usando props.
- `index.html` incluye `lang="es-GT"`, `color-scheme`, `theme-color`, `description`, favicon SVG y manifest.
- `public/sitemap.xml` y `public/robots.txt` presentes.

> **Pendiente**:
> - El sitemap usa dominio placeholder `https://www.example.com/...` (reemplazar por dominio real antes de producción).
> - No hay Open Graph ni Twitter Cards (`og:title`, `og:image`, `twitter:card`).
> - No hay JSON-LD `LocalBusiness` (importante para SEO local en Guatemala: dirección, teléfono, horarios).
> - `Seo.jsx` no maneja canonical ni hreflang.

### PWA

- `public/site.webmanifest` básico, `display: "standalone"`.
- Solo incluye un icono PNG 1024x1024.

> **Pendiente**: añadir iconos maskable 192x192 y 512x512 para cumplir requisitos PWA instalables.

---

## Accesibilidad

El proyecto incluye varias prácticas de accesibilidad ya implementadas:

- `lang="es-GT"`, `color-scheme` en el HTML.
- Skip-link "Saltar al contenido principal" visible al recibir foco.
- `:focus-visible` con outline visible de 3px en todo el documento.
- `aria-label` y `aria-labelledby` en Navbar, Footer, secciones CTA, PageHeader y NotFound.
- Botón de menú móvil con `aria-expanded` / `aria-controls`, cierre con `Escape` y devolución de foco.
- `role="status"` + `aria-live="polite"` en `RouteLoader` y banner del formulario.
- `AssetPlaceholder` con `role="img"` + `aria-label`.
- Formulario con `autoComplete` semántico y `<label>` envolviendo inputs.
- `prefers-reduced-motion` soportado en CSS para desactivar transiciones y hovers.

> **Pendiente**:
> - Indicador de página activa en Navbar solo cambia color: añadir subrayado / barra para usuarios con baja visión.
> - Añadir `aria-hidden` en numeración decorativa (`01/02/03` de Nosotros).
> - Añadir `lang="en"` en tokens foráneos dentro de texto en español (`CCTV`, `WhatsApp`).
> - Filtrar props inválidas en `ButtonLink` (p. ej. evitar que `to` llegue a un `<a>`).

---

## Notas importantes

### `Recursos/` es necesaria para compilar

`src/data/media.js` importa imágenes desde `../../Recursos/...` (la carpeta `Recursos/` en la raíz del proyecto). Esta carpeta contiene las fotografías originales del cliente:

- Logos (`logo_sinfondo_512.png`, `LogoNuevo.png`, ...)
- Fachadas y oficinas (`sisfachada1.jpeg`, `oficinas_administrativas.jpeg`)
- Uniformes (`uniformecasual.jpeg`, `uniformegala.jpeg`, `uniformefatiga.jpeg`)
- Personal operativo (`agente_fatiga_turno.jpeg`, `guardiaypatrulla.jpeg`, `patrullaenruta.jpeg`)
- Mapa de cobertura (`mapa_nuevo.png`)
- Numeración correlativa (`1.jpeg` a `24.jpeg`) con fotos históricas

**Implicaciones**:
- Esta carpeta **no está en `.gitignore`** y se commitea al repo (las imágenes son parte del contenido del sitio).
- Si se elimina `Recursos/`, el build romperá porque los imports de `media.js` no se resolverán.
- En el futuro conviene mover las imágenes necesarias a `public/images/` (ya hay algunas en `public/images/brand/` y `public/images/operations/`), y dejar `Recursos/` como archivo crudo histórico sin referenciarla desde el código.

### Sin tests ni linter todavía

El proyecto no tiene ESLint, Prettier ni Vitest configurados. Cualquier contribución debería respetar el estilo manual ya presente (2 espacios, sin punto y coma, comillas simples, JSX con `className="..."`).

### Sin backend

El prototipo es client-side puro. El formulario de contacto solo cambia `submitted` a `true` y muestra un banner de validación visual: **no envía datos a ningún lado**. Ver [Roadmap](#roadmap-pendiente).

---

## Roadmap pendiente

Lista priorizada de trabajo pendiente, alineada con una auditoría técnica del proyecto:

### Crítica
- [ ] **Integrar envío real del formulario de contacto**: definir servicio (EmailJS / Formspree / backend propio / WhatsApp API), añadir estado de `loading`/`error` y validación custom accesible (`aria-invalid`, `aria-describedby`).
- [ ] **`ErrorBoundary` global**: si un chunk lazy falla al cargar, hoy el `RouteLoader` se queda colgado sin fallback de error.
- [ ] **Reemplazar `example.com` en `sitemap.xml`** por el dominio real de producción.
- [ ] **Unificar tokens duplicados**: eliminar `:root --app-*` y leer `--color-*` desde las clases custom de `global.css`.
- [ ] **Centralizar datos en `src/data/`**: servicios, sectores, infraestructura, uniformes, valores (hoy duplicados entre páginas con copys distintos).

### Alta
- [ ] Añadir ESLint + Prettier + scripts `npm run lint` / `npm run format`.
- [ ] Añadir Vitest + Testing Library + tests básicos de componentes y rutas.
- [ ] Integrar Google Maps real en `/contacto` (Embed básico o `@react-google-maps/api` con estilo acorde al sitio).
- [ ] Generación de la navegación desde `NAV_ITEMS` únicamente (eliminar items hardcoded en Navbar).
- [ ] Open Graph + Twitter Cards en `index.html` y `Seo.jsx`.
- [ ] Renombrar tokens `primary-cyan` / `border-cyber` / `shadow-command` a nombres coherentes con la paleta actual (dorado/bronce).
- [ ] `README.md` en agua de documentación: listo con este archivo.

### Media
- [ ] Skeletons por página en lugar del único `RouteLoader` genérico.
- [ ] Honeypot anti-spam en el formulario.
- [ ] `ButtonLink` robusto: filtrar props, soportar `disabled`, variantes `ghost`/`danger`.
- [ ] Aprovechar `framer-motion` con `whileInView` + stagger en grids de cards.
- [ ] Año del copyright dinámico en Footer (`new Date().getFullYear()`).
- [ ] JSON-LD `LocalBusiness` para SEO local.

### Baja
- [ ] Indicador de página activa con subrayado animado (framer-motion `layoutId`).
- [ ] Typos y consistencia de copys entre páginas (p. ej. "Logística" con tilde).
- [ ] `lang="en"` en tokens foráneos (`CCTV`, `WhatsApp`).
- [ ] `aria-hidden` en numeración decorativa de Nosotros.
- [ ] Iconos PWA maskable 192/512 en `site.webmanifest`.
- [ ] Variar CTAs finales entre páginas (hoy idénticos en todas).
- [ ] Configurar font mono real (JetBrains Mono / IBM Plex Mono) para datos tabulares.

---

## Licencia

Código del prototipo: titularidad de **SIS S.A. / Corporación SIS**. Uso interno. Sin licencia open-source aplicada por ahora.
