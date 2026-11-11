import React, { useEffect, useMemo, useRef, useState } from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';

const PERIODS = [
  { id: '7d', label: '7 dias', buckets: 7, unit: 'day' },
  { id: '30d', label: '30 dias', buckets: 6, unit: 'fiveDays' },
  { id: '12m', label: '12 meses', buckets: 12, unit: 'month' },
];

const formatMoney = (value) => value.toLocaleString('pt-BR', {
  style: 'currency', currency: 'BRL', maximumFractionDigits: 0,
});

const formatLabel = (date, unit) => {
  if (unit === 'month') return date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
};

/* A leitura é feita dos pedidos existentes. Cada ponto mostra o faturamento
   acumulado até aquele período, para a linha representar a evolução do total. */
function buildSeries(orders, period) {
  const datedOrders = orders
    .map((order) => ({ ...order, date: new Date(order.createdAt) }))
    .filter((order) => Number.isFinite(order.date.getTime()));
  const latest = datedOrders.reduce(
    (date, order) => (order.date > date ? order.date : date),
    datedOrders[0]?.date ?? new Date(),
  );
  const anchor = new Date(latest.getFullYear(), latest.getMonth(), latest.getDate());
  const buckets = Array.from({ length: period.buckets }, (_, index) => {
    const date = new Date(anchor);
    if (period.unit === 'month') date.setMonth(date.getMonth() - (period.buckets - index - 1), 1);
    else if (period.unit === 'fiveDays') date.setDate(date.getDate() - ((period.buckets - index) * 5 - 1));
    else date.setDate(date.getDate() - (period.buckets - index - 1));
    return { date, value: 0 };
  });
  const start = buckets[0].date;

  datedOrders.forEach((order) => {
    const date = new Date(order.date.getFullYear(), order.date.getMonth(), order.date.getDate());
    if (date < start || date > anchor) return;
    let index;
    if (period.unit === 'month') {
      index = (date.getFullYear() - start.getFullYear()) * 12 + date.getMonth() - start.getMonth();
    } else {
      const days = Math.floor((date - start) / 86400000);
      index = period.unit === 'fiveDays' ? Math.floor(days / 5) : days;
    }
    if (buckets[index]) buckets[index].value += Number(order.totalValue) || 0;
  });

  let running = 0;
  return buckets.map((bucket) => ({
    ...bucket,
    value: (running += bucket.value),
    label: formatLabel(bucket.date, period.unit),
  }));
}

function makeCurve(points) {
  return points.map((point, index) => {
    if (!index) return `M ${point.x} ${point.y}`;
    const previous = points[index - 1];
    const middle = (previous.x + point.x) / 2;
    return `C ${middle} ${previous.y}, ${middle} ${point.y}, ${point.x} ${point.y}`;
  }).join(' ');
}

export function RevenueChart({ orders = [], total = 0, markup = 0 }) {
  const [periodId, setPeriodId] = useState('30d');
  const [scrubIndex, setScrubIndex] = useState(null);
  const period = PERIODS.find((item) => item.id === periodId) ?? PERIODS[1];
  const series = useMemo(() => buildSeries(orders, period), [orders, period]);
  const [displayValues, setDisplayValues] = useState(() => series.map((point) => point.value));
  const displayValuesRef = useRef(displayValues);
  const periodIndex = PERIODS.findIndex((item) => item.id === periodId);

  /* Morph the previous curve into the selected window. The values stay tied
     to real orders; only their presentation interpolates for the transition. */
  useEffect(() => {
    const target = series.map((point) => point.value);
    const source = displayValuesRef.current;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !source.length || source.length === target.length && source.every((value, index) => value === target[index])) {
      displayValuesRef.current = target;
      setDisplayValues(target);
      return undefined;
    }

    const sample = (values, at) => {
      if (values.length === 1) return values[0];
      const position = at * (values.length - 1);
      const low = Math.floor(position);
      const high = Math.min(values.length - 1, low + 1);
      return values[low] + (values[high] - values[low]) * (position - low);
    };
    const start = performance.now();
    let frame = 0;
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / 420);
      const eased = 1 - (1 - progress) ** 4;
      const next = target.map((value, index) => sample(source, index / Math.max(target.length - 1, 1)) + (value - sample(source, index / Math.max(target.length - 1, 1))) * eased);
      displayValuesRef.current = next;
      setDisplayValues(next);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [series]);

  const width = 720;
  const height = 190;
  const padX = 12;
  const padY = 16;
  const max = Math.max(...series.map((point) => point.value), ...displayValues, 1);
  const points = series.map((point, index) => ({
    ...point,
    value: displayValues[index] ?? point.value,
    x: padX + (index / Math.max(series.length - 1, 1)) * (width - padX * 2),
    y: height - padY - ((displayValues[index] ?? point.value) / max) * (height - padY * 2),
  }));
  const path = makeCurve(points);
  const area = `${path} L ${width - padX} ${height} L ${padX} ${height} Z`;
  const activeIndex = scrubIndex === null ? null : Math.min(points.length - 1, scrubIndex);
  const activePoint = activeIndex === null ? null : points[activeIndex];
  const readPoint = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left) / (rect.width || 1)));
    setScrubIndex(Math.round(ratio * (points.length - 1)));
  };

  return (
    <section className="revenue-card rounded-2xl border border-gray-200 bg-white p-5 shadow-2xs" aria-labelledby="revenue-title">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p id="revenue-title" className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Faturamento Total</p>
          <p className="mt-1 text-2xl font-black tabular-nums text-gray-900">{formatMoney(total)}</p>
          <p className="mt-1 text-[11px] font-semibold text-emerald-700">Margem média: {markup}%</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-xl bg-emerald-50 px-2.5 py-1.5 text-xs font-bold text-emerald-700">
          <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
          <DollarSign className="h-3.5 w-3.5" aria-hidden="true" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold text-gray-500">Evolução acumulada</p>
        <div className="revenue-periods" role="group" aria-label="Período do gráfico">
          <span className="revenue-period-pill" style={{ '--period-index': periodIndex }} aria-hidden="true" />
          {PERIODS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setPeriodId(item.id)}
              aria-pressed={periodId === item.id}
              className={`revenue-period-button ${periodId === item.id ? 'is-active' : ''}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div
        className="revenue-chart mt-2"
        role="img"
        tabIndex={0}
        aria-label={`Faturamento acumulado nos últimos ${period.label}. Arraste sobre o gráfico para consultar os valores por período.`}
        onPointerDown={readPoint}
        onPointerMove={(event) => { if (event.buttons || event.pointerType === 'touch') readPoint(event); }}
        onPointerLeave={() => setScrubIndex(null)}
        onKeyDown={(event) => {
          if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
          event.preventDefault();
          setScrubIndex((current) => Math.max(0, Math.min(points.length - 1, (current ?? points.length - 1) + (event.key === 'ArrowRight' ? 1 : -1))));
        }}
      >
        <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="revenue-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((line) => (
            <line key={line} x1={padX} x2={width - padX} y1={height * line} y2={height * line} stroke="#e5e7eb" strokeDasharray="4 6" />
          ))}
          <path d={area} fill="url(#revenue-fill)" />
          <path d={path} fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          {activePoint && <line x1={activePoint.x} x2={activePoint.x} y1={padY} y2={height} stroke="#9ca3af" strokeDasharray="4 5" vectorEffect="non-scaling-stroke" />}
          {points.map((point) => (
            <circle key={`${point.label}-${point.x}`} cx={point.x} cy={point.y} r="3.5" fill="#fff" stroke="#059669" strokeWidth="2" vectorEffect="non-scaling-stroke">
              <title>{`${point.label}: ${formatMoney(point.value)}`}</title>
            </circle>
          ))}
          {activePoint && <circle cx={activePoint.x} cy={activePoint.y} r="6" fill="#fff" stroke="#047857" strokeWidth="3" vectorEffect="non-scaling-stroke" />}
        </svg>
      </div>
      {activePoint && (
        <p className="mt-1 text-right text-[11px] font-semibold text-emerald-800" aria-live="polite">
          Acumulado em {activePoint.label}: {formatMoney(activePoint.value)}
        </p>
      )}
      <div className="flex justify-between px-1 text-[10px] font-medium text-gray-400" aria-hidden="true">
        <span>{series[0]?.label}</span>
        <span>{series[Math.floor((series.length - 1) / 2)]?.label}</span>
        <span>{series[series.length - 1]?.label}</span>
      </div>
    </section>
  );
}
