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

export function exportRoutePdf(ids: string[]): void {
  const stops = ids.map(attractionById).filter(Boolean) as Attraction[];
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210;
  const H = 297;
  const M = 16;
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
    const summaryLines = doc.splitTextToSize(ascii(s.summary), W - 2 * M) as string[];
    const blockH = 6 + 5 + summaryLines.length * 4.4 + (hotel ? 6 : 0) + 8;
    ensure(blockH);

    doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(`${i + 1}. ${ascii(s.city)}`, M, y);

    doc.setTextColor(140, 140, 140);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text(ascii(s.dayHint), W - M, y, { align: "right" });
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

    doc.setDrawColor(58, 58, 64);
    doc.setLineWidth(0.2);
    doc.line(M, y, W - M, y);
    y += 6;
  });

  doc.save("PB2026_Moja_trasa.pdf");
}
