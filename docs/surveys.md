# Portal de Experiencia del Cliente

Modulo privado de encuestas de satisfaccion para clientes de Corporacion SIS. Vive dentro del mismo proyecto React/Vite `SISSAWebSite`, pero esta separado del sitio institucional publico.

## Arquitectura

- Frontend: React + Vite existente, en `src/modules/surveys`.
- Backend: Supabase PostgreSQL, Supabase Auth, Row Level Security y RPC.
- Hosting: GitHub Pages bajo `/SISSAWebSite/`.
- Encuesta cliente: `/encuesta/:token`.
- Administracion: `/encuestas-admin/login` y rutas protegidas bajo `/encuestas-admin`.

El modulo no aparece en Navbar, Footer ni paginas publicas.

## Configuracion Supabase

1. Crear un proyecto en Supabase.
2. Ejecutar la migracion:

```bash
supabase db push
```

Tambien puede ejecutarse el contenido de `supabase/migrations/202608070001_survey_portal.sql` desde el SQL editor de Supabase.

3. Opcional: cargar datos demo con `supabase/seed.sql`.

## Variables de entorno

Configurar localmente y en GitHub Pages:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

No colocar `SUPABASE_SERVICE_ROLE_KEY` en Vite, GitHub Pages ni ningun archivo servido al navegador.

## Crear primer administrador

1. Crear un usuario en Supabase Auth.
2. Copiar su `id`.
3. Insertarlo en `app_admins`:

```sql
insert into public.app_admins (user_id, role)
values ('USER_UUID_AQUI', 'owner');
```

Ese usuario puede entrar en `/encuestas-admin/login`.

## Crear clientes

Entrar en `/encuestas-admin/clientes`.

Campos:

- Nombre del cliente.
- Codigo interno opcional.
- Nombre de contacto opcional.
- Correo opcional.
- Estado activo/inactivo.

El panel permite crear, editar, activar y desactivar clientes. La desactivacion funciona como eliminacion logica.

## Crear y administrar campanas

Entrar en `/encuestas-admin/campanas`.

Campos:

- Nombre.
- Ano.
- Mes.
- Fecha de inicio.
- Fecha de vencimiento.
- Estado: `draft`, `active`, `completed`, `expired`, `cancelled`.

La base impide duplicar campanas del mismo `period_year + period_month`.

El panel permite:

- Crear campana.
- Editar campana.
- Activar.
- Cerrar.
- Cancelar.

## Generar invitaciones

En `/encuestas-admin/campanas`:

1. Seleccionar campana.
2. Seleccionar clientes activos.
3. Presionar `Generar invitaciones`.

El RPC `admin_generate_survey_invitations`:

- Genera tokens aleatorios con `gen_random_bytes(32)`.
- Retorna enlaces existentes si ya habia invitacion para ese cliente y campana.
- Evita duplicados con `UNIQUE(campaign_id, client_id)`.
- Devuelve estado, fecha de creacion, vencimiento y fecha de respuesta si aplica.

El panel permite copiar un enlace, copiar varios enlaces y exportar enlaces en CSV o Excel compatible.

## Responder encuesta

El cliente abre:

```text
https://naguirrel0209.github.io/SISSAWebSite/encuesta/TOKEN
```

El frontend llama `survey_get_by_token(token)` antes de mostrar el formulario.

Estados posibles:

- `active`: muestra encuesta.
- `completed`: muestra agradecimiento y no permite otra respuesta.
- `expired`: muestra encuesta no disponible.
- `cancelled`: muestra enlace no disponible.
- `invalid`: muestra enlace no valido.

Al enviar, `survey_submit_response` marca la invitacion como completada e inserta la respuesta de forma atomica.

## Consultar resultados

Entrar en `/encuestas-admin/resultados`.

Incluye:

- Buscador por cliente o campana.
- Filtro por campana.
- Filtro por estado.
- Filtro por seguimiento.
- Orden por fecha, promedio o recomendacion.
- Exportacion CSV.
- Exportacion Excel compatible.
- Detalle de respuesta.

El detalle muestra cliente, campana, fecha, estado, promedio, recomendacion, preguntas y comentarios.

## Dashboard ejecutivo

Entrar en `/encuestas-admin`.

Muestra datos reales de Supabase:

- Encuestas enviadas.
- Respondidas.
- Pendientes.
- Porcentaje de respuesta.
- Promedio general.
- NPS.
- Problemas reportados.
- Respuestas que requieren seguimiento.
- Graficas SVG livianas de promedio mensual, respuestas, NPS mensual y distribucion 1-5.

## Criterio de seguimiento

Una respuesta requiere seguimiento si:

- `q1_rating <= 2`
- `q2_rating <= 2`
- `q3_rating <= 2`
- `q4_rating <= 2`
- `q5_recommendation <= 6`
- o existe texto en `problem_comment`

## Despliegue GitHub Pages

El proyecto mantiene:

```js
base: '/SISSAWebSite/'
```

El router mantiene:

```jsx
<BrowserRouter basename="/SISSAWebSite">
```

`public/404.html` permite refresh directo de rutas SPA en GitHub Pages. El workflow conserva ese fallback.

Configurar en GitHub Actions como `vars` o `secrets`:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- variables EmailJS existentes

## Seguridad implementada

- RLS activado en tablas del modulo.
- Sin lectura publica directa de clientes, invitaciones, tokens o respuestas.
- La encuesta publica solo usa RPC limitados por token.
- Admin protegido por Supabase Auth y `app_admins`.
- Tokens largos, aleatorios y unicos.
- `survey_responses.invitation_id` es unico.
- `survey_invitations.token` es unico.
- `survey_invitations.campaign_id + client_id` es unico.
- No se usan cookies, localStorage ni sessionStorage para decidir si una encuesta fue respondida.
- Exportacion escapa contenido para evitar HTML/CSV mal formado.

## Pruebas recomendadas despues de configurar Supabase

1. Login admin correcto.
2. Refresh de `/encuestas-admin` con sesion activa.
3. Crear cliente.
4. Editar cliente.
5. Desactivar y activar cliente.
6. Crear campana.
7. Intentar duplicar periodo.
8. Generar invitacion.
9. Copiar enlace.
10. Abrir encuesta con token valido.
11. Enviar encuesta sin comentarios.
12. Reabrir el mismo token.
13. Probar token inexistente.
14. Vencer o cancelar una invitacion.
15. Ver dashboard y resultados.
16. Filtrar resultados por seguimiento.
17. Exportar CSV y Excel.

## Limites pendientes por decision futura

No se implementa todavia:

- Envio masivo de correos.
- WhatsApp API.
- SMS.
- CRM.
- IA.
- PDF.
- Power BI.
- Reportes externos.
