import { jsPDF } from "jspdf";
import {
  DEFAULT_ROUTE, HOTELS, attractionById, hotelById, routeDistanceKm,
  type Attraction,
} from "@/data/trip";
import { DEJAVU_SANS_BASE64 } from "./font-dejavu";

/* Generator PDF — jasny motyw (biała kartka), akcenty w kolorze złota.
   Osadzony font DejaVu Sans obsługuje polskie znaki (ł, ą, ę, ś, ż, ó…),
   więc tekst renderuje się poprawnie bez transliteracji. */

const GOLD: [number, number, number] = [163, 120, 10];
const INK: [number, number, number] = [30, 30, 34];
const MUTED: [number, number, number] = [120, 120, 128];
const LINE: [number, number, number] = [222, 222, 228];
const W = 210;
const H = 297;
const M = 16;
const IMG_W = 42;
const IMG_H = 28;
const FONT = "DejaVu";

function loadImage(url: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

/** Cover-scale do JPEG data-URI. null przy błędzie CORS (taint canvas). */
function toJpegDataUrl(img: HTMLImageElement, w: number, h: number): string | null {
  try {
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d");
    if (!ctx) return null;
    const ir = img.naturalWidth / img.naturalHeight;
    const tr = w / h;
    let sw = img.naturalWidth;
    let sh = img.naturalHeight;
    let sx = 0;
    let sy = 0;
    if (ir > tr) {
      sw = img.naturalHeight * tr;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      sh = img.naturalWidth / tr;
      sy = (img.naturalHeight - sh) / 2;
    }
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
    return c.toDataURL("image/jpeg", 0.85);
  } catch {
    return null;
  }
}

/* ── Builder ──────────────────────────────────────────────────────────── */

interface Ctx {
  doc: jsPDF;
  y: number;
}

function newDoc(): jsPDF {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  doc.addFileToVFS("DejaVuSans.ttf", DEJAVU_SANS_BASE64);
  doc.addFont("DejaVuSans.ttf", FONT, "normal");
  doc.setFont(FONT, "normal");
  return doc;
}

function ensure(c: Ctx, need: number) {
  if (c.y + need > H - M) {
    c.doc.addPage();
    c.doc.setFont(FONT, "normal");
    c.y = M + 4;
  }
}

function titlePage(c: Ctx, subtitle: string, stats: string) {
  const { doc } = c;
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.setFontSize(26);
  doc.text("PĘTLA BAŁKAŃSKA 2026", W / 2, 42, { align: "center" });

  doc.setTextColor(INK[0], INK[1], INK[2]);
  doc.setFontSize(13);
  doc.text(subtitle, W / 2, 52, { align: "center" });

  doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
  doc.setFontSize(10.5);
  doc.text(stats, W / 2, 66, { align: "center" });
  doc.setFontSize(9);
  doc.text(`Wygenerowano: ${new Date().toLocaleDateString("pl-PL")}`, W / 2, 73, {
    align: "center",
  });

  doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.setLineWidth(0.6);
  doc.line(M, 82, W - M, 82);
  c.y = 94;
}

function sectionTitle(c: Ctx, text: string) {
  ensure(c, 16);
  const { doc } = c;
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.setFontSize(15);
  doc.text(text, M, c.y);
  c.y += 2.5;
  doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.setLineWidth(0.4);
  doc.line(M, c.y, M + 42, c.y);
  c.y += 7;
}

function renderStops(c: Ctx, ids: string[], thumbs: (string | null)[]) {
  const { doc } = c;
  ids.forEach((id, i) => {
    const s = attractionById(id);
    if (!s) return;
    const hotel = hotelById(s.baseHotelId);
    const thumb = thumbs[i];
    const textW = W - 2 * M - (thumb ? IMG_W + 6 : 0);
    const summaryLines = doc.splitTextToSize(s.summary, textW) as string[];
    const textH = 6 + 5 + summaryLines.length * 4.6 + (hotel ? 5 : 0);
    const blockH = Math.max(textH, thumb ? IMG_H : 0) + 8;
    ensure(c, blockH);

    const top = c.y;
    if (thumb) {
      try {
        doc.addImage(thumb, "JPEG", W - M - IMG_W, top - 4, IMG_W, IMG_H, undefined, "FAST");
      } catch {
        /* pomiń nietypowy data-URI */
      }
    }

    doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.setFontSize(13);
    doc.text(`${i + 1}. ${s.city}`, M, c.y);

    doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
    doc.setFontSize(8.5);
    doc.text(s.dayHint, M + textW, c.y, { align: "right" });
    c.y += 6;

    doc.setTextColor(INK[0], INK[1], INK[2]);
    doc.setFontSize(10.5);
    doc.text(s.name, M, c.y);
    c.y += 5;

    doc.setTextColor(70, 70, 76);
    doc.setFontSize(9);
    doc.text(summaryLines, M, c.y);
    c.y += summaryLines.length * 4.6 + 1.5;

    if (hotel) {
      doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
      doc.setFontSize(8.5);
      doc.text(`Hotel: ${hotel.name} ${"★".repeat(hotel.stars)}`, M, c.y);
      c.y += 5;
    }

    c.y = Math.max(c.y, thumb ? top - 4 + IMG_H : c.y);
    doc.setDrawColor(LINE[0], LINE[1], LINE[2]);
    doc.setLineWidth(0.2);
    doc.line(M, c.y, W - M, c.y);
    c.y += 6;
  });
}

function renderLogistics(c: Ctx) {
  sectionTitle(c, "Logistyka");
  const rows: [string, string][] = [
    ["Dystans", "ok. 3500 km"],
    ["Czas", "19 dni (10.08 – 28.08.2026)"],
    ["Ekipa", "5 osób + Kot"],
    ["Paliwo", "ok. 450–500 L"],
    ["Pojazd", "2017 Cadillac Escalade ESV"],
    ["Silnik / napęd", "6.2L V8 420 KM / 4WD"],
    ["Zużycie", "~14 L/100km (trasa)"],
  ];
  const { doc } = c;
  doc.setFontSize(10);
  rows.forEach(([k, v]) => {
    ensure(c, 6);
    doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
    doc.text(k, M, c.y);
    doc.setTextColor(INK[0], INK[1], INK[2]);
    doc.text(v, M + 55, c.y);
    c.y += 6;
  });
  c.y += 4;
}

function renderHotels(c: Ctx) {
  sectionTitle(c, "Sugerowane hotele");
  const { doc } = c;
  HOTELS.filter((h) => h.origin === "plan").forEach((h) => {
    const whyLines = doc.splitTextToSize(h.why, W - 2 * M) as string[];
    ensure(c, 6 + whyLines.length * 4.3 + 5);
    doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.setFontSize(10.5);
    doc.text(`${h.name}  ${"★".repeat(h.stars)}`, M, c.y);
    doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
    doc.setFontSize(8);
    doc.text(h.stage, M + (W - 2 * M), c.y, { align: "right" });
    c.y += 4.8;
    doc.setTextColor(70, 70, 76);
    doc.setFontSize(8.5);
    doc.text(whyLines, M, c.y);
    c.y += whyLines.length * 4.3 + 4;
  });
}

async function loadThumbs(ids: string[]): Promise<(string | null)[]> {
  return Promise.all(
    ids.map(async (id) => {
      const s = attractionById(id);
      const src = s?.photos[0]?.url.replace(/width=\d+/, "width=480");
      if (!src) return null;
      const img = await loadImage(src);
      return img ? toJpegDataUrl(img, 360, 240) : null;
    }),
  );
}

function statsLine(ids: string[]): string {
  const stops = ids.map(attractionById).filter(Boolean) as Attraction[];
  const countries = new Set(stops.map((s) => s.country));
  return `Przystanki: ${stops.length}    Kraje: ${countries.size}    Dystans: ~${routeDistanceKm(ids)} km`;
}

/* ── Publiczne API ────────────────────────────────────────────────────── */

/** Eksport ułożonej w Planerze trasy (z podaną kolejnością id). */
export async function exportRoutePdf(ids: string[]): Promise<void> {
  const thumbs = await loadThumbs(ids);
  const doc = newDoc();
  const c: Ctx = { doc, y: 0 };
  titlePage(c, "Rodzinny Roadtrip Premium — Moja trasa", statsLine(ids));
  renderStops(c, ids, thumbs);
  doc.save("PB2026_Moja_trasa.pdf");
}

/**
 * Eksport wg opcji z modala „Pobierz PDF":
 * 0 = Pełny plan, 1 = Tylko trasa, 2 = Atrakcje, 3 = Logistyka.
 */
export async function exportPlanPdf(option: number): Promise<void> {
  const ids = DEFAULT_ROUTE;
  const needStops = option === 0 || option === 1 || option === 2;
  const thumbs = needStops ? await loadThumbs(ids) : [];

  const doc = newDoc();
  const c: Ctx = { doc, y: 0 };

  const subtitles = [
    "Rodzinny Roadtrip Premium — pełny plan",
    "Plan trasy — 19 dni",
    "Atrakcje na trasie",
    "Logistyka i noclegi",
  ];
  titlePage(c, subtitles[option] ?? subtitles[0], statsLine(ids));

  if (option === 0 || option === 3) renderLogistics(c);
  if (needStops) {
    sectionTitle(c, option === 2 ? "Atrakcje" : "Trasa — 19 dni");
    renderStops(c, ids, thumbs);
  }
  if (option === 0 || option === 3) renderHotels(c);

  const names = ["Pelny_Plan", "Trasa", "Atrakcje", "Logistyka"];
  doc.save(`PB2026_${names[option] ?? "Plan"}.pdf`);
}
