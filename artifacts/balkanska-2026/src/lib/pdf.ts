import { jsPDF } from "jspdf";
import { attractionById, hotelById, type Attraction } from "@/data/trip";

/* Eksport ułożonej trasy z Planera do PDF w stylu dark/gold.
   jsPDF (fonty standardowe) używa kodowania WinAnsi i nie renderuje części
   polskich znaków (np. „ł"), dlatego tekst jest transliterowany do ASCII. */

const GOLD: [number, number, number] = [212, 175, 55];
const BG: [number, number, number] = [15, 17, 21];

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
    .replace(/[\u0300-\u036f]/g, "")
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

/** Przeskaluj/kadruj (cover) obraz do JPEG data-URI. Zwraca null przy błędzie
 *  CORS (canvas „taint") — wtedy PDF powstaje bez tego zdjęcia. */
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

export async function exportRoutePdf(ids: string[]): Promise<void> {
  const stops = ids.map(attractionById).filter(Boolean) as Attraction[];

  // Miniatury wczytywane równolegle; przy błędzie (np. CORS) pomijamy zdjęcie.
  const thumbs = await Promise.all(
    stops.map(async (s) => {
      const src = s.photos[0]?.url.replace(/width=\d+/, "width=480");
      if (!src) return null;
      const img = await loadImage(src);
      return img ? toJpegDataUrl(img, 320, 216) : null;
    }),
  );

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210;
  const H = 297;
  const M = 16;
  const IMG_W = 40;
  const IMG_H = 27;
  let y = 0;

  const paintBg = () => {
    doc.setFillColor(BG[0], BG[1], BG[2]);
    doc.rect(0, 0, W, H, "F");
  };
  const ensure = (need: number) => {
    if (y + need > H - M) {
      doc.addPage();
      paintBg();
      y = M + 4;
    }
  };

  paintBg();

  // ── Strona tytułowa ──
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.text("PETLA BALKANSKA 2026", W / 2, 45, { align: "center" });

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  doc.text("Rodzinny Roadtrip Premium - Moja trasa", W / 2, 55, { align: "center" });

  const countries = new Set(stops.map((s) => s.country));
  doc.setTextColor(205, 205, 205);
  doc.setFontSize(11);
  doc.text(`Przystanki: ${stops.length}    Kraje: ${countries.size}`, W / 2, 70, {
    align: "center",
  });
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(9);
  doc.text(
    ascii(`Wygenerowano: ${new Date().toLocaleDateString("pl-PL")}`),
    W / 2,
    77,
    { align: "center" },
  );

  doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.setLineWidth(0.6);
  doc.line(M, 85, W - M, 85);
  y = 96;

  // ── Przystanki ──
  stops.forEach((s, i) => {
    const hotel = hotelById(s.baseHotelId);
    const thumb = thumbs[i];
    const textW = W - 2 * M - (thumb ? IMG_W + 5 : 0);
    const summaryLines = doc.splitTextToSize(ascii(s.summary), textW) as string[];
    const textH = 5.5 + 5 + summaryLines.length * 4.4 + (hotel ? 5 : 0);
    const blockH = Math.max(textH, thumb ? IMG_H : 0) + 8;
    ensure(blockH);

    const top = y;

    // miniatura po prawej stronie bloku
    if (thumb) {
      try {
        doc.addImage(thumb, "JPEG", W - M - IMG_W, top - 4, IMG_W, IMG_H);
      } catch {
        /* addImage może rzucić na nietypowym data-URI — pomiń */
      }
    }

    doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(`${i + 1}. ${ascii(s.city)}`, M, y);

    doc.setTextColor(140, 140, 140);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text(ascii(s.dayHint), M + textW, y, { align: "right" });
    y += 5.5;

    doc.setTextColor(232, 232, 232);
    doc.setFontSize(10);
    doc.text(ascii(s.name), M, y);
    y += 5;

    doc.setTextColor(188, 188, 188);
    doc.setFontSize(9);
    doc.text(summaryLines, M, y);
    y += summaryLines.length * 4.4 + 1.5;

    if (hotel) {
      doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
      doc.setFontSize(8.5);
      doc.text(ascii(`Hotel: ${hotel.name} ${"*".repeat(hotel.stars)}`), M, y);
      y += 5;
    }

    // dolna krawędź bloku = niżej z: tekst / miniatura
    y = Math.max(y, thumb ? top - 4 + IMG_H : y);
    doc.setDrawColor(58, 58, 64);
    doc.setLineWidth(0.2);
    doc.line(M, y, W - M, y);
    y += 6;
  });

  doc.save("PB2026_Moja_trasa.pdf");
}
