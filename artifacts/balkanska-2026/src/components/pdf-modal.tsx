import { useState } from "react";
import { motion } from "framer-motion";
import { X, FileText, CheckCircle2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { exportPlanPdf } from "@/lib/pdf";

export function PdfModal({ onClose }: { onClose: () => void }) {
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const options = [
    { id: 0, title: "Pełny Plan", desc: "Wszystko + strona tytułowa" },
    { id: 1, title: "Tylko Trasa", desc: "Tabela 19 dni" },
    { id: 2, title: "Atrakcje", desc: "7 kart doświadczeń" },
    { id: 3, title: "Logistyka", desc: "Dashboard + Cadillac specs" },
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    setProgress(8);

    // Płynny pasek postępu w trakcie generowania (ładowanie zdjęć + render).
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 90 ? 90 : prev + 7));
    }, 160);

    try {
      await exportPlanPdf(selectedOption);
      setProgress(100);
    } catch (err) {
      console.error("Nie udało się wygenerować PDF:", err);
    } finally {
      clearInterval(interval);
      setTimeout(() => {
        setIsGenerating(false);
        onClose();
      }, 600);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-card w-full max-w-2xl rounded-2xl border border-primary/20 shadow-2xl overflow-hidden relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
          disabled={isGenerating}
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-primary/10 p-3 rounded-full">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-serif font-bold text-white">Eksport PDF</h2>
              <p className="text-white/60 text-sm">Wybierz zakres dokumentu</p>
            </div>
          </div>

          {!isGenerating ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedOption(opt.id)}
                    className={`text-left p-6 rounded-xl border transition-all duration-300 ${
                      selectedOption === opt.id 
                        ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(212,175,55,0.15)]" 
                        : "bg-background/50 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`font-serif font-medium text-lg ${selectedOption === opt.id ? "text-primary" : "text-white"}`}>
                        {opt.title}
                      </h3>
                      {selectedOption === opt.id && <CheckCircle2 className="h-5 w-5 text-primary" />}
                    </div>
                    <p className="text-white/60 text-sm">{opt.desc}</p>
                  </button>
                ))}
              </div>

              <Button 
                onClick={handleGenerate}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg rounded-xl"
              >
                <Download className="mr-2 h-5 w-5" />
                Generuj PDF
              </Button>
            </>
          ) : (
            <div className="py-12 text-center">
              <h3 className="text-xl font-serif text-white mb-6">Generowanie dokumentu...</h3>
              <Progress value={progress} className="h-2 bg-background mb-4" />
              <p className="text-primary font-mono">{progress}%</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
