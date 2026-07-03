import { useMemo } from "react";
import { attractionById, type Attraction } from "@/data/trip";

/* Schematyczna mapa trasy — pinezki rozmieszczone wg współrzędnych geo
   atrakcji, połączone linią w kolejności trasy. Samowystarczalna (SVG,
   bez zewnętrznych kafelków), więc działa też offline i aktualizuje się
   na żywo wraz z edycją trasy w Planerze. */

interface Props {
  ids: string[];
  selectedId?: string;
  onSelect?: (id: string) => void;
}

const W = 1000;
const H = 560;
const PAD = 78;

export function RouteMap({ ids, selectedId, onSelect }: Props) {
  const nodes = useMemo(() => {
    const pts = ids.map(attractionById).filter(Boolean) as Attraction[];
    if (pts.length === 0) return [];
    // korekta długości geo o cosinus średniej szerokości (proporcje)
    const meanLat = pts.reduce((a, s) => a + s.lat, 0) / pts.length;
    const k = Math.cos((meanLat * Math.PI) / 180);
    const xs = pts.map((s) => s.lng * k);
    const ys = pts.map((s) => s.lat);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const rx = maxX - minX || 1;
    const ry = maxY - minY || 1;
    return pts.map((s, i) => ({
      s,
      x: PAD + ((xs[i] - minX) / rx) * (W - 2 * PAD),
      y: PAD + (1 - (ys[i] - minY) / ry) * (H - 2 * PAD),
    }));
  }, [ids]);

  const path = nodes
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  if (nodes.length === 0) {
    return (
      <div className="rounded-2xl border border-primary/15 bg-[#0F1115] p-10 text-center text-white/40 text-sm">
        Dodaj przystanki, aby zobaczyć mapę trasy.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-primary/15 bg-[#0F1115] overflow-hidden">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        role="img"
        aria-label="Mapa trasy z pinezkami przystanków"
      >
        {/* delikatna siatka */}
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
          </pattern>
          <linearGradient id="routeStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <rect width={W} height={H} fill="url(#grid)" />

        {/* linia trasy */}
        <path
          d={path}
          fill="none"
          stroke="url(#routeStroke)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1 9"
        />
        <path
          d={path}
          fill="none"
          stroke="#D4AF37"
          strokeOpacity="0.18"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* pinezki */}
        {nodes.map(({ s, x, y }, i) => {
          const active = s.id === selectedId;
          return (
            <g
              key={s.id}
              transform={`translate(${x} ${y})`}
              onClick={() => onSelect?.(s.id)}
              style={{ cursor: onSelect ? "pointer" : "default" }}
            >
              {active && <circle r="15" fill="#D4AF37" opacity="0.18" />}
              <circle
                r={active ? 12 : 10}
                fill={active ? "#D4AF37" : "#1A1D23"}
                stroke="#D4AF37"
                strokeWidth="2"
              />
              <text
                textAnchor="middle"
                dy="3.5"
                fontSize="11"
                fontWeight="700"
                fill={active ? "#0F1115" : "#D4AF37"}
              >
                {i + 1}
              </text>
              {/* etykieta miasta */}
              <text
                textAnchor="middle"
                y="-16"
                fontSize="12.5"
                fontWeight="600"
                fill={active ? "#FFFFFF" : "rgba(255,255,255,0.75)"}
              >
                {s.flag} {s.city}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="px-4 py-2.5 border-t border-primary/10 flex items-center justify-between text-xs text-white/40">
        <span>Kliknij pinezkę, aby zobaczyć podgląd atrakcji</span>
        <span>{nodes.length} przystanków · schemat wg współrzędnych geo</span>
      </div>
    </div>
  );
}
