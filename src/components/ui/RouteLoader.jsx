export default function RouteLoader() {
  return (
    <div className="section-shell flex min-h-[55vh] items-center justify-center" role="status" aria-live="polite">
      <span className="sr-only">Cargando contenido</span>
      <span className="route-loader" aria-hidden="true" />
    </div>
  );
}
