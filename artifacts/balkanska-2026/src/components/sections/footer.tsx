import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function Footer({ onOpenPdf }: { onOpenPdf: () => void }) {
  return (
    <footer className="bg-[#0a0b0d] py-16 border-t border-primary/20">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <div className="text-3xl font-serif font-bold text-primary tracking-widest mb-8">
          PB2026
        </div>
        
        <p className="text-white/60 font-light tracking-wide max-w-3xl mx-auto mb-10 text-sm md:text-base">
          Warszawa → Węgry → Rumunia → Bułgaria → Grecja → Bułgaria → Rumunia → Warszawa
        </p>

        <div className="flex justify-center mb-16">
          <Button 
            onClick={onOpenPdf}
            variant="outline"
            className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 px-8 py-6 rounded-none uppercase tracking-widest text-xs"
          >
            <Download className="mr-2 h-4 w-4" />
            Pobierz PDF Planu
          </Button>
        </div>

        <div className="text-white/40 text-xs font-light">
          &copy; 2026 Pętla Bałkańska. Rodzinny Roadtrip Premium.
        </div>
      </div>
    </footer>
  );
}
