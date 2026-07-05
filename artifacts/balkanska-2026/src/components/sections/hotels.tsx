import { useState } from "react";
import { motion } from "framer-motion";
import { BedDouble, MapPin, ExternalLink, Check, Star, Filter } from "lucide-react";
import {
  HOTELS, ASSUMPTIONS, assumptionById, bookingUrl, hotelMapUrl, hotelTotal, type Hotel,
} from "@/data/trip";

const tierLabel: Record<Hotel["priceTier"], string> = {
  "$$": "Standard",
  "$$$": "Premium",
  "$$$$": "Luksus",
};

function noce(n: number): string {
  if (n === 1) return "noc";
  if (n >= 2 && n <= 4) return "noce";
  return "nocy";
}

function HotelCard({ hotel, delay }: { hotel: Hotel; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.5, delay }}
      className="glass-panel rounded-xl p-5 flex flex-col hover:border-primary/40 transition-colors"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="min-w-0">
          <p className="text-white/40 text-[11px] uppercase tracking-wider mb-1">{hotel.stage}</p>
          <h3 className="text-lg font-serif font-bold text-white leading-tight">{hotel.name}</h3>
          <p className="text-white/50 text-xs mt-0.5">{hotel.flag} {hotel.city}, {hotel.country}</p>
        </div>
        {hotel.origin === "alternatywa" && (
          <span className="shrink-0 text-[10px] uppercase tracking-wider text-primary/80 border border-primary/30 rounded-full px-2 py-0.5">
            Alternatywa
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 mb-3">
        <span className="flex items-center gap-0.5 text-primary">
          {Array.from({ length: hotel.stars }).map((_, i) => (
            <Star key={i} size={13} className="fill-primary" />
          ))}
        </span>
        <span className="text-white/40 text-xs">·</span>
        <span className="text-white/60 text-xs font-medium">{hotel.priceTier} {tierLabel[hotel.priceTier]}</span>
      </div>

      <p className="text-white/70 text-sm leading-relaxed flex-1">{hotel.why}</p>

      {/* Pokoje i szacowana cena */}
      <div className="mt-4 rounded-lg border border-primary/20 bg-primary/[0.06] px-3.5 py-3">
        <div className="flex items-center gap-2 text-white/80 text-xs">
          <BedDouble size={13} className="text-primary shrink-0" />
          <span>{hotel.rooms}</span>
        </div>
        <div className="mt-2.5 flex items-end justify-between gap-3">
          <div className="text-xs">
            <span className="text-white/45">{hotel.nights} {noce(hotel.nights)} · </span>
            <span className="text-white/80 font-medium">~{hotel.pricePerNight} €/noc</span>
          </div>
          <div className="text-right leading-tight">
            <span className="block text-[10px] uppercase tracking-wider text-white/40">Razem za pobyt</span>
            <span className="text-primary font-semibold text-base">~{hotelTotal(hotel)} €</span>
          </div>
        </div>
      </div>

      {/* Dopasowanie do pierwotnych założeń */}
      <div className="mt-4">
        <p className="text-primary/70 text-[11px] uppercase tracking-widest font-semibold mb-2">Spełnia założenia</p>
        <div className="flex flex-wrap gap-1.5">
          {hotel.matches.map((m) => {
            const a = assumptionById(m);
            return (
              <span key={m} title={a?.detail}
                className="inline-flex items-center gap-1 text-[11px] text-white/70 bg-primary/8 border border-primary/20 rounded-full px-2 py-0.5">
                <Check size={10} className="text-primary" /> {a?.label ?? m}
              </span>
            );
          })}
        </div>
      </div>

      <div className="flex gap-2 mt-4 pt-4 border-t border-white/5">
        <a href={bookingUrl(hotel)} target="_blank" rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity">
          <BedDouble size={13} /> Sprawdź ceny <ExternalLink size={11} />
        </a>
        <a href={hotelMapUrl(hotel)} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-white/15 text-white/60 text-xs hover:border-primary/40 hover:text-primary transition-colors">
          <MapPin size={13} /> Mapa
        </a>
      </div>
    </motion.div>
  );
}

export function Hotels() {
  const [assumption, setAssumption] = useState<string | "all">("all");

  const list = assumption === "all"
    ? HOTELS
    : HOTELS.filter((h) => h.matches.includes(assumption));

  const planHotels = HOTELS.filter((h) => h.origin === "plan");
  const planTotal = planHotels.reduce((s, h) => s + hotelTotal(h), 0);
  const planNights = planHotels.reduce((s, h) => s + h.nights, 0);

  return (
    <section id="hotele" className="py-24 md:py-32 bg-card relative border-t border-primary/10">
      <div className="mx-auto w-full max-w-[1800px] px-6 md:px-12 2xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="mb-8 text-center"
        >
          <span className="inline-flex items-center gap-2 text-primary text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            <BedDouble size={14} /> Sugerowane noclegi
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
            Hotele wg Pierwotnych Założeń
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base">
            Każdy nocleg dobrany pod założenia wyjazdu: rodzina 5 osób + kot, standard premium,
            parking dla Cadillaca ESV i atrakcje dla dzieci. Filtruj po założeniu.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6" />
        </motion.div>

        {/* Legenda założeń + filtr */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setAssumption("all")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
              assumption === "all"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background/40 text-white/60 border-white/10 hover:border-primary/40 hover:text-white"
            }`}
          >
            <Filter size={12} /> Wszystkie założenia
          </button>
          {ASSUMPTIONS.map((a) => (
            <button
              key={a.id}
              onClick={() => setAssumption(a.id === assumption ? "all" : a.id)}
              title={a.detail}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                assumption === a.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background/40 text-white/60 border-white/10 hover:border-primary/40 hover:text-white"
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((h, i) => (
            <HotelCard key={h.id} hotel={h} delay={(i % 3) * 0.08} />
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <div className="glass-panel rounded-xl px-6 py-4">
            <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Szacowany koszt noclegów (plan)</p>
            <p className="text-2xl font-serif text-primary">~{planTotal.toLocaleString("pl-PL")} €</p>
            <p className="text-white/40 text-xs mt-1">{planNights} nocy · 9 baz noclegowych · 5 osób + Kot</p>
          </div>
        </div>

        <p className="text-white/30 text-xs text-center mt-6">
          Ceny są orientacyjne (sierpień 2026, za potrzebne pokoje dla 5 osób) i mogą się różnić.
          Linki „Sprawdź ceny" prowadzą do wyszukiwarki Booking.com — dostępność i aktualne stawki potwierdź przed rezerwacją.
        </p>
      </div>
    </section>
  );
}
