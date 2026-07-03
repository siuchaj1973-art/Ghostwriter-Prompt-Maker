import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { attractionById, type Attraction } from "@/data/trip";

/* Prawdziwa, interaktywna mapa (Leaflet + kafelki OpenStreetMap).
   Kafelki pobierane są w przeglądarce użytkownika w czasie działania.
   Pinezki to numerowane divIcony (bez zewnętrznych assetów markera),
   trasa łączy przystanki w kolejności. Aktualizuje się na żywo. */

interface Props {
  ids: string[];
  selectedId?: string;
  onSelect?: (id: string) => void;
}

function pinHtml(n: number, active: boolean): string {
  const bg = active ? "#D4AF37" : "#1A1D23";
  const fg = active ? "#0F1115" : "#D4AF37";
  return `<div style="
    width:26px;height:26px;border-radius:50%;
    background:${bg};color:${fg};
    border:2px solid #D4AF37;
    display:flex;align-items:center;justify-content:center;
    font:700 12px/1 Montserrat,sans-serif;
    box-shadow:0 2px 6px rgba(0,0,0,.5);
  ">${n}</div>`;
}

export function LeafletMap({ ids, selectedId, onSelect }: Props) {
  const elRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);

  // inicjalizacja mapy
  useEffect(() => {
    if (!elRef.current || mapRef.current) return;
    const map = L.map(elRef.current, {
      scrollWheelZoom: false,
      zoomControl: true,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "© OpenStreetMap",
    }).addTo(map);
    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
      layerRef.current = null;
    };
  }, []);

  // rysowanie trasy i pinezek
  useEffect(() => {
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!map || !layer) return;
    layer.clearLayers();

    const pts = ids.map(attractionById).filter(Boolean) as Attraction[];
    if (pts.length === 0) return;

    const latlngs = pts.map((s) => [s.lat, s.lng] as [number, number]);
    L.polyline(latlngs, {
      color: "#D4AF37",
      weight: 3,
      opacity: 0.85,
      dashArray: "6 8",
    }).addTo(layer);

    pts.forEach((s, i) => {
      const marker = L.marker([s.lat, s.lng], {
        icon: L.divIcon({
          className: "pb-pin",
          html: pinHtml(i + 1, s.id === selectedId),
          iconSize: [26, 26],
          iconAnchor: [13, 13],
        }),
      }).addTo(layer);
      marker.bindTooltip(`${s.flag} ${s.city} — ${s.name}`, { direction: "top" });
      if (onSelect) marker.on("click", () => onSelect(s.id));
    });

    map.fitBounds(L.latLngBounds(latlngs).pad(0.2), { animate: false });
  }, [ids, selectedId, onSelect]);

  // `isolate` zamyka wysokie z-index Leafleta w osobnym kontekście,
  // żeby lightbox (z-50) zawsze był nad mapą.
  return (
    <div
      ref={elRef}
      className="isolate w-full h-[420px] md:h-[480px] rounded-2xl overflow-hidden border border-primary/15"
    />
  );
}
