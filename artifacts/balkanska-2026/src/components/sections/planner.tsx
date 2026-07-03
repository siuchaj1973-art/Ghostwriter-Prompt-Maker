import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, X, Plus, Check, ChevronUp, ChevronDown, Trash2, RotateCcw,
  MapPin, Hotel as HotelIcon, Clock, ZoomIn, ChevronLeft, ChevronRight,
  Route, Compass, Download, Map as MapIcon,
  Mountain, Castle, Church, Landmark, Waves, Droplets, Gem, Trees,
  type LucideIcon,
} from "lucide-react";
import {
  ATTRACTIONS, CATEGORIES, DEFAULT_ROUTE, attractionById, hotelById,
  categoryMeta, type Attraction, type Category,
} from "@/data/trip";
import { RouteMap } from "./route-map";
import { exportRoutePdf } from "@/lib/pdf";

const ICONS: Record<string, LucideIcon> = {
  Mountain, Castle, Church, Landmark, Waves, Droplets, Gem, Trees,
};

function CatIcon({ name, ...props }: { name: string } & React.ComponentProps<LucideIcon>) {
  const Cmp = ICONS[name] ?? MapPin;
  return <Cmp {...props} />;
}

export function Planner() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<Category | "all">("all");
  const [route, setRoute] = useState<string[]>(DEFAULT_ROUTE);
  const [previewId, setPreviewId] = useState<string>(DEFAULT_ROUTE[0]);
  const [photoIdx, setPhotoIdx] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ATTRACTIONS.filter((a) => {
      if (cat !== "all" && a.category !== cat) return false;
      if (!q) return true;
      return (
        a.name.toLowerCase().includes(q) ||
        a.city.toLowerCase().includes(q) ||
        a.country.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.highlights.some((h) => h.toLowerCase().includes(q))
      );
    });
  }, [query, cat]);

  const preview = attractionById(previewId);
  const inRoute = (id: string) => route.includes(id);

  const openPreview = (id: string) => { setPreviewId(id); setPhotoIdx(0); };
  const toggleRoute = (id: string) =>
    setRoute((r) => (r.includes(id) ? r.filter((x) => x !== id) : [...r, id]));
  const move = (idx: number, dir: -1 | 1) =>
    setRoute((r) => {
      const j = idx + dir;
      if (j < 0 || j >= r.length) return r;
      const next = [...r];
      [next[idx], next[j]] = [next[j], next[idx]];
      return next;
    });
  const removeStop = (id: string) => setRoute((r) => r.filter((x) => x !== id));
  const resetRoute = () => setRoute(DEFAULT_ROUTE);

  const stats = useMemo(() => {
    const stops = route.map(attractionById).filter(Boolean) as Attraction[];
    const countries = new Set(stops.map((s) => s.country));
    return { stops: stops.length, countries: countries.size };
  }, [route]);

  return (
    <section id="planer" className="py-24 md:py-32 bg-background relative border-t border-primary/10">
      <div className="container mx-auto px-6 md:px-12">
        {/* Nagłówek */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="mb-10 text-center"
        >
          <span className="inline-flex items-center gap-2 text-primary text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            <Compass size={14} /> Narzędzie interaktywne
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
            Planer Trasy w Locie
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base">
            Wyszukaj atrakcje, obejrzyj prawdziwe zdjęcia i modyfikuj kolejność przystanków —
            dodawaj, usuwaj i zmieniaj trasę w czasie rzeczywistym.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6" />
        </motion.div>

        {/* Pasek wyszukiwania + filtry */}
        <div className="mb-6 flex flex-col gap-4">
          <div className="relative max-w-xl mx-auto w-full">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/60" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Szukaj atrakcji, miasta lub kraju…"
              className="w-full bg-card/70 border border-primary/20 rounded-xl pl-11 pr-10 py-3 text-white placeholder:text-white/35 focus:outline-none focus:border-primary/60 transition-colors"
            />
            {query && (
              <button onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setCat("all")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                cat === "all"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card/40 text-white/60 border-white/10 hover:border-primary/40 hover:text-white"
              }`}
            >
              Wszystkie
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id === cat ? "all" : c.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  cat === c.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card/40 text-white/60 border-white/10 hover:border-primary/40 hover:text-white"
                }`}
              >
                <CatIcon name={c.icon} size={13} /> {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Układ 3-kolumnowy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* ── KATALOG ── */}
          <div className="lg:col-span-4 rounded-2xl border border-primary/15 bg-card/40 overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-primary/10 flex items-center justify-between">
              <p className="text-primary text-xs uppercase tracking-[0.2em] font-semibold">Katalog atrakcji</p>
              <span className="text-white/40 text-xs">{results.length}</span>
            </div>
            <div className="overflow-y-auto max-h-[560px] divide-y divide-white/5">
              {results.length === 0 && (
                <p className="text-white/40 text-sm p-6 text-center">Brak wyników — zmień zapytanie lub filtr.</p>
              )}
              {results.map((a) => {
                const active = previewId === a.id;
                const added = inRoute(a.id);
                return (
                  <div
                    key={a.id}
                    onClick={() => openPreview(a.id)}
                    className={`flex gap-3 p-3 cursor-pointer transition-colors group ${
                      active ? "bg-primary/12" : "hover:bg-white/5"
                    }`}
                  >
                    <div className="w-16 h-14 rounded-lg overflow-hidden shrink-0 bg-black/40">
                      <img src={a.photos[0].url} alt={a.name} loading="lazy"
                        className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">{a.flag}</span>
                        <p className={`text-sm font-medium truncate ${active ? "text-primary" : "text-white"}`}>
                          {a.name}
                        </p>
                      </div>
                      <p className="text-white/40 text-xs truncate">{a.city} · {categoryMeta(a.category).label}</p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleRoute(a.id); }}
                      title={added ? "Usuń z trasy" : "Dodaj do trasy"}
                      className={`self-center shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
                        added
                          ? "bg-primary/15 border-primary/40 text-primary"
                          : "border-white/15 text-white/50 hover:border-primary/50 hover:text-primary"
                      }`}
                    >
                      {added ? <Check size={15} /> : <Plus size={15} />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── PODGLĄD ── */}
          <div className="lg:col-span-5 rounded-2xl border border-primary/15 bg-[#1A1D23] overflow-hidden">
            {preview && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={preview.id}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                >
                  {/* galeria */}
                  <div className="relative h-64 md:h-72 bg-black overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={`${preview.id}-${photoIdx}`}
                        src={preview.photos[photoIdx].url}
                        alt={preview.photos[photoIdx].caption}
                        initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
                        onClick={() => setLightbox(preview.photos[photoIdx].url)}
                        className="w-full h-full object-cover cursor-zoom-in"
                      />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1D23] via-transparent to-black/20 pointer-events-none" />
                    <span className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white/70 text-xs px-2.5 py-1 rounded-full">
                      {preview.dayHint}
                    </span>
                    <button onClick={() => setLightbox(preview.photos[photoIdx].url)}
                      className="absolute top-3 right-3 p-2 rounded-lg bg-black/40 backdrop-blur-sm text-white/60 hover:text-white">
                      <ZoomIn size={15} />
                    </button>
                    {preview.photos.length > 1 && (
                      <>
                        <button
                          onClick={() => setPhotoIdx((p) => (p - 1 + preview.photos.length) % preview.photos.length)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white/70 hover:text-white">
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          onClick={() => setPhotoIdx((p) => (p + 1) % preview.photos.length)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white/70 hover:text-white">
                          <ChevronRight size={16} />
                        </button>
                        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex gap-1.5">
                          {preview.photos.map((_, i) => (
                            <button key={i} onClick={() => setPhotoIdx(i)}
                              className={`rounded-full transition-all ${i === photoIdx ? "w-4 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-white/40"}`} />
                          ))}
                        </div>
                      </>
                    )}
                    <p className="absolute bottom-2.5 left-4 right-4 text-white/55 text-xs truncate">
                      {preview.photos[photoIdx].caption}
                    </p>
                  </div>

                  {/* treść */}
                  <div className="p-5 md:p-6 space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{preview.flag}</span>
                        <span className="text-xs text-white/40">{preview.city} · {preview.country}</span>
                        <span className="ml-auto flex items-center gap-1 text-xs text-white/40">
                          <Clock size={11} /> {preview.duration}
                        </span>
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-white leading-tight">{preview.name}</h3>
                    </div>

                    <p className="text-white/70 text-sm leading-relaxed">{preview.summary}</p>

                    <ul className="space-y-1.5">
                      {preview.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                          <span className="text-primary shrink-0 mt-0.5">›</span>{h}
                        </li>
                      ))}
                    </ul>

                    <div className="rounded-xl border border-primary/25 bg-primary/5 px-4 py-3">
                      <p className="text-primary text-xs uppercase tracking-widest font-semibold mb-1">Wskazówka</p>
                      <p className="text-white/65 text-sm leading-relaxed">{preview.tip}</p>
                    </div>

                    {(() => {
                      const hotel = hotelById(preview.baseHotelId);
                      return hotel ? (
                        <div className="flex items-center gap-2 text-xs text-white/60">
                          <HotelIcon size={13} className="text-primary" />
                          Sugerowany hotel etapu:
                          <span className="text-primary font-medium">{hotel.name}</span>
                          <span>{"★".repeat(hotel.stars)}</span>
                        </div>
                      ) : null;
                    })()}

                    <button
                      onClick={() => toggleRoute(preview.id)}
                      className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                        inRoute(preview.id)
                          ? "bg-primary/10 border-primary/40 text-primary hover:bg-primary/20"
                          : "bg-primary text-primary-foreground border-primary hover:opacity-90"
                      }`}
                    >
                      {inRoute(preview.id)
                        ? (<><Check size={15} /> W trasie — kliknij, aby usunąć</>)
                        : (<><Plus size={15} /> Dodaj do mojej trasy</>)}
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* ── MOJA TRASA ── */}
          <div className="lg:col-span-3 rounded-2xl border border-primary/15 bg-card/40 overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-primary/10 flex items-center gap-2">
              <Route size={14} className="text-primary" />
              <p className="text-primary text-xs uppercase tracking-[0.15em] font-semibold">Moja trasa</p>
              <div className="ml-auto flex items-center gap-3">
                <button
                  onClick={() => exportRoutePdf(route)}
                  disabled={route.length === 0}
                  title="Pobierz ułożoną trasę jako PDF"
                  className="text-white/40 hover:text-primary transition-colors disabled:opacity-30"
                >
                  <Download size={14} />
                </button>
                <button
                  onClick={resetRoute}
                  title="Przywróć pierwotną trasę"
                  className="text-white/40 hover:text-primary transition-colors"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px bg-white/5 text-center">
              <div className="bg-card/60 py-2.5">
                <p className="text-xl font-serif text-primary">{stats.stops}</p>
                <p className="text-white/40 text-[11px] uppercase tracking-wider">Przystanki</p>
              </div>
              <div className="bg-card/60 py-2.5">
                <p className="text-xl font-serif text-primary">{stats.countries}</p>
                <p className="text-white/40 text-[11px] uppercase tracking-wider">Kraje</p>
              </div>
            </div>

            <div className="overflow-y-auto max-h-[500px] p-2 space-y-1.5">
              {route.length === 0 && (
                <p className="text-white/40 text-sm p-6 text-center">
                  Trasa jest pusta. Dodaj atrakcje z katalogu.
                </p>
              )}
              {route.map((id, idx) => {
                const a = attractionById(id);
                if (!a) return null;
                return (
                  <div
                    key={id}
                    onClick={() => openPreview(id)}
                    className={`flex items-center gap-2 rounded-lg px-2 py-2 cursor-pointer transition-colors ${
                      previewId === id ? "bg-primary/12" : "bg-black/20 hover:bg-white/5"
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-primary/15 text-primary text-[11px] font-semibold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-white text-xs font-medium truncate">{a.flag} {a.city}</p>
                      <p className="text-white/40 text-[11px] truncate">{a.name}</p>
                    </div>
                    <div className="flex flex-col shrink-0" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => move(idx, -1)} disabled={idx === 0}
                        className="text-white/40 hover:text-primary disabled:opacity-20 disabled:hover:text-white/40">
                        <ChevronUp size={13} />
                      </button>
                      <button onClick={() => move(idx, 1)} disabled={idx === route.length - 1}
                        className="text-white/40 hover:text-primary disabled:opacity-20 disabled:hover:text-white/40">
                        <ChevronDown size={13} />
                      </button>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); removeStop(id); }}
                      className="text-white/30 hover:text-red-400 shrink-0">
                      <Trash2 size={13} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── MAPA TRASY (na żywo) ── */}
        <div className="mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <MapIcon size={16} className="text-primary" />
              <h3 className="text-lg font-serif font-bold text-white">Mapa trasy</h3>
              <span className="text-white/40 text-xs">— aktualizuje się na żywo</span>
            </div>
            <button
              onClick={() => exportRoutePdf(route)}
              disabled={route.length === 0}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-primary/40 bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-all disabled:opacity-30"
            >
              <Download size={15} /> Pobierz trasę (PDF)
            </button>
          </div>
          <RouteMap ids={route} selectedId={previewId} onSelect={openPreview} />
        </div>
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-sm p-4"
            onClick={() => setLightbox(null)}>
            <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              src={lightbox} alt="Powiększone zdjęcie"
              className="max-w-full max-h-full rounded-xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()} />
            <button onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white">
              <X size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
