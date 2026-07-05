import { jsPDF } from "jspdf";
import {
  DEFAULT_ROUTE, HOTELS, attractionById, hotelById, routeDistanceKm,
  type Attraction,
} from "@/data/trip";

/* Generator PDF w stylu dark/gold.
   jsPDF (fonty standardowe) używa kodowania WinAnsi i nie renderuje części
   polskich znaków (np. „ł"), dlatego tekst jest transliterowany do ASCII. */

const GOLD: [number, number, number] = [212, 175, 55];
const BG: [number, number, number] = [15, 17, 21];
const W = 210;
const H = 297;
const M = 16;
const IMG_W = 40;
const IMG_H = 27;

function ascii(s: string): string {
  return s
    .replace(/[–—]/g, "-")
    .replace(/·/g, "-")
    .replace(/→/g, "->")
    .replace(/★/g, "*")
    .replace(/›/g, "-")
    .replace(/°/g, " st.")
    .replace(/²/g, "2")
    .replace(/ł/g, "l")
    .replace(/Ł/g, "L")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^\x00-\x7e]/g, "")
    .replace(/[ \t]+/g, " ")
    .trim();
}

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
    return c.toDataURL("image/jpeg", 0.82);
  } catch {
    return null;
  }
}

/* ── Builder ──────────────────────────────────────────────────────────── */

interface Ctx {
  doc: jsPDF;
  y: number;
}

function paintBg(doc: jsPDF) {
  doc.setFillColor(BG[0], BG[1], BG[2]);
  doc.rect(0, 0, W, H, "F");
}

function ensure(c: Ctx, need: number) {
  if (c.y + need > H - M) {
    c.doc.addPage();
    paintBg(c.doc);
    c.y = M + 4;
  }
}

function titlePage(c: Ctx, subtitle: string, statsLine: string) {
  const { doc } = c;
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.text("PETLA BALKANSKA 2026", W / 2, 45, { align: "center" });

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  doc.text(ascii(subtitle), W / 2, 55, { align: "center" });

  doc.setTextColor(205, 205, 205);
  doc.setFontSize(11);
  doc.text(ascii(statsLine), W / 2, 70, { align: "center" });

  doc.setTextColor(150, 150, 150);
  doc.setFontSize(9);
  doc.text(ascii(`Wygenerowano: ${new Date().toLocaleDateString("pl-PL")}`), W / 2, 77, {
    align: "center",
  });

  doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.setLineWidth(0.6);
  doc.line(M, 85, W - M, 85);
  c.y = 96;
}

function sectionTitle(c: Ctx, text: string) {
  ensure(c, 16);
  const { doc } = c;
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text(ascii(text), M, c.y);
  c.y += 3;
  doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.setLineWidth(0.4);
  doc.line(M, c.y, M + 40, c.y);
  c.y += 7;
}

function paragraph(c: Ctx, text: string, size = 9, color: [number, number, number] = [188, 188, 188]) {
  const { doc } = c;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(size);
  doc.setTextColor(color[0], color[1], color[2]);
  const lines = doc.splitTextToSize(ascii(text), W - 2 * M) as string[];
  ensure(c, lines.length * (size * 0.5));
  doc.text(lines, M, c.y);
  c.y += lines.length * (size * 0.5) + 2;
}

function renderStops(c: Ctx, ids: string[], thumbs: (string | null)[]) {
  const { doc } = c;
  ids.forEach((id, i) => {
    const s = attractionById(id);
    if (!s) return;
    const hotel = hotelById(s.baseHotelId);
    const thumb = thumbs[i];
    const textW = W - 2 * M - (thumb ? IMG_W + 5 : 0);
    const summaryLines = doc.splitTextToSize(ascii(s.summary), textW) as string[];
    const textH = 5.5 + 5 + summaryLines.length * 4.4 + (hotel ? 5 : 0);
    const blockH = Math.max(textH, thumb ? IMG_H : 0) + 8;
    ensure(c, blockH);

    const top = c.y;
    if (thumb) {
      try {
        doc.addImage(thumb, "JPEG", W - M - IMG_W, top - 4, IMG_W, IMG_H);
      } catch {
        /* pomiń nietypowy data-URI */
      }
    }

    doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(`${i + 1}. ${ascii(s.city)}`, M, c.y);

    doc.setTextColor(140, 140, 140);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text(ascii(s.dayHint), M + textW, c.y, { align: "right" });
    c.y += 5.5;

    doc.setTextColor(232, 232, 232);
    doc.setFontSize(10);
    doc.text(ascii(s.name), M, c.y);
    c.y += 5;

    doc.setTextColor(188, 188, 188);
    doc.setFontSize(9);
    doc.text(summaryLines, M, c.y);
    c.y += summaryLines.length * 4.4 + 1.5;

    if (hotel) {
      doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
      doc.setFontSize(8.5);
      doc.text(ascii(`Hotel: ${hotel.name} ${"*".repeat(hotel.stars)}`), M, c.y);
      c.y += 5;
    }

    c.y = Math.max(c.y, thumb ? top - 4 + IMG_H : c.y);
    doc.setDrawColor(58, 58, 64);
    doc.setLineWidth(0.2);
    doc.line(M, c.y, W - M, c.y);
    c.y += 6;
  });
}

function renderLogistics(c: Ctx) {
  sectionTitle(c, "Logistyka");
  const rows: [string, string][] = [
    ["Dystans", "ok. 3500 km"],
    ["Czas", "19 dni (10.08 - 28.08.2026)"],
    ["Ekipa", "5 osob + Kot"],
    ["Paliwo", "ok. 450-500 L"],
    ["Pojazd", "2017 Cadillac Escalade ESV"],
    ["Silnik / naped", "6.2L V8 420 KM / 4WD"],
    ["Zuzycie", "~14 L/100km (trasa)"],
  ];
  const { doc } = c;
  doc.setFontSize(10);
  rows.forEach(([k, v]) => {
    ensure(c, 6);
    doc.setTextColor(150, 150, 150);
    doc.text(ascii(k), M, c.y);
    doc.setTextColor(235, 235, 235);
    doc.text(ascii(v), M + 55, c.y);
    c.y += 6;
  });
  c.y += 4;
}

function renderHotels(c: Ctx) {
  sectionTitle(c, "Sugerowane hotele");
  const { doc } = c;
  HOTELS.filter((h) => h.origin === "plan").forEach((h) => {
    const whyLines = doc.splitTextToSize(ascii(h.why), W - 2 * M) as string[];
    ensure(c, 6 + whyLines.length * 4.2 + 5);
    doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text(ascii(`${h.name}  ${"*".repeat(h.stars)}`), M, c.y);
    doc.setTextColor(140, 140, 140);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(ascii(h.stage), M + (W - 2 * M), c.y, { align: "right" });
    c.y += 4.6;
    doc.setTextColor(185, 185, 185);
    doc.setFontSize(8.5);
    doc.text(whyLines, M, c.y);
    c.y += whyLines.length * 4.2 + 4;
  });
}

async function loadThumbs(ids: string[]): Promise<(string | null)[]> {
  return Promise.all(
    ids.map(async (id) => {
      const s = attractionById(id);
      const src = s?.photos[0]?.url.replace(/width=\d+/, "width=480");
      if (!src) return null;
      const img = await loadImage(src);
      return img ? toJpegDataUrl(img, 320, 216) : null;
    }),
  );
}

function statsLine(ids: string[]): string {
  const stops = ids.map(attractionById).filter(Boolean) as Attraction[];
  const countries = new Set(stops.map((s) => s.country));
  return `Przystanki: ${stops.length}    Kraje: ${countries.size}    Dystans: ~${routeDistanceKm(ids)} km`;
}

/* ── Publiczne API ────────────────────────────────────────────────────── */

/** Eksport ułożonej w Planerze trasy (z podanym kolejnością id). */
export async function exportRoutePdf(ids: string[]): Promise<void> {
  const thumbs = await loadThumbs(ids);
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  paintBg(doc);
  const c: Ctx = { doc, y: 0 };
  titlePage(c, "Rodzinny Roadtrip Premium - Moja trasa", statsLine(ids));
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

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  paintBg(doc);
  const c: Ctx = { doc, y: 0 };

  const subtitles = [
    "Rodzinny Roadtrip Premium - Pelny plan",
    "Plan trasy - 19 dni",
    "Atrakcje na trasie",
    "Logistyka i noclegi",
  ];
  titlePage(c, subtitles[option] ?? subtitles[0], statsLine(ids));

  if (option === 0 || option === 3) renderLogistics(c);
  if (needStops) {
    sectionTitle(c, option === 2 ? "Atrakcje" : "Trasa - 19 dni");
    renderStops(c, ids, thumbs);
  }
  if (option === 0 || option === 3) renderHotels(c);

  const names = ["Pelny_Plan", "Trasa", "Atrakcje", "Logistyka"];
  doc.save(`PB2026_${names[option] ?? "Plan"}.pdf`);
}
