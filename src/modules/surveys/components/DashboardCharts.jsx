import { getMonthlySeries, getRatingDistribution } from '../utils/surveyCalculations.js';

export default function DashboardCharts({ rows }) {
  const monthly = getMonthlySeries(rows).slice(-6);
  const distribution = getRatingDistribution(rows);
  const maxSent = Math.max(1, ...monthly.map((item) => item.sent));
  const maxDistribution = Math.max(1, ...distribution.map((item) => item.count));

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <section className="glass-panel p-5">
        <h3 className="text-lg font-bold text-white">Promedio mensual</h3>
        <div className="mt-5 flex h-48 items-end gap-3" role="img" aria-label="Promedio mensual de satisfaccion">
          {monthly.length ? monthly.map((item) => {
            const height = item.average ? `${Math.max(10, (item.average / 5) * 100)}%` : '8%';

            return (
              <div key={item.key} className="flex h-full min-w-0 flex-1 flex-col justify-end gap-2">
                <div className="flex flex-1 items-end rounded-md bg-white/[0.035] p-1">
                  <div className="w-full rounded-md bg-primary-cyan" style={{ height }} title={`${item.label}: ${item.average ?? 'sin datos'}`} />
                </div>
                <p className="truncate text-center text-xs text-muted-text">{item.label}</p>
                <p className="text-center text-sm font-bold text-white">{item.average ?? '-'}</p>
              </div>
            );
          }) : (
            <p className="text-sm text-muted-text">Sin datos suficientes.</p>
          )}
        </div>
      </section>

      <section className="glass-panel p-5">
        <h3 className="text-lg font-bold text-white">Encuestas respondidas</h3>
        <div className="mt-5 space-y-3">
          {monthly.length ? monthly.map((item) => (
            <div key={item.key}>
              <div className="mb-1 flex justify-between gap-3 text-sm">
                <span className="text-muted-text">{item.label}</span>
                <span className="font-bold text-white">{item.responded}/{item.sent}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-md bg-white/[0.06]">
                <div className="h-full rounded-md bg-success" style={{ width: `${(item.sent / maxSent) * 100}%` }} />
              </div>
            </div>
          )) : (
            <p className="text-sm text-muted-text">Sin invitaciones generadas.</p>
          )}
        </div>
      </section>

      <section className="glass-panel p-5">
        <h3 className="text-lg font-bold text-white">NPS mensual</h3>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {monthly.length ? monthly.slice(-3).map((item) => (
            <article key={item.key} className="rounded-md border border-border-cyber bg-white/[0.035] p-4">
              <p className="text-xs font-semibold text-muted-text">{item.label}</p>
              <p className="mt-2 text-3xl font-bold text-white">{item.nps ?? '-'}</p>
            </article>
          )) : (
            <p className="text-sm text-muted-text">Sin respuestas calificadas.</p>
          )}
        </div>
      </section>

      <section className="glass-panel p-5">
        <h3 className="text-lg font-bold text-white">Distribucion de respuestas 1-5</h3>
        <div className="mt-5 space-y-3">
          {distribution.map((item) => (
            <div key={item.score} className="grid grid-cols-[2rem_1fr_3rem] items-center gap-3 text-sm">
              <span className="font-bold text-white">{item.score}</span>
              <div className="h-3 overflow-hidden rounded-md bg-white/[0.06]">
                <div className="h-full rounded-md bg-primary-cyan-bright" style={{ width: `${(item.count / maxDistribution) * 100}%` }} />
              </div>
              <span className="text-right text-muted-text">{item.count}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
