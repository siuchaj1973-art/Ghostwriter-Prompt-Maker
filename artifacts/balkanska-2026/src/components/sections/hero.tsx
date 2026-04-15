import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, Download, Map } from "lucide-react";

export function Hero({ onOpenPdf }: { onOpenPdf: () => void }) {
  const scrollToRoute = () => {
    document.getElementById("trasa")?.scrollIntoView({ behavior: "smooth" });
  };

  const stats = [
    { label: "Dystans", value: "3500 km" },
    { label: "Czas", value: "19 dni" },
    { label: "Ekipa", value: "5 osób + Kot" },
    { label: "Paliwo", value: "~475 L" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat attachment-fixed"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')",
          backgroundAttachment: "fixed"
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/40 via-background/60 to-background" />

      <div className="container relative z-20 mx-auto px-6 md:px-12 text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-primary text-sm md:text-lg uppercase tracking-[0.3em] mb-4 font-semibold">
            Rodzinny Roadtrip Premium
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-2xl">
            PĘTLA<br />BAŁKAŃSKA 2026
          </h1>
          <p className="text-foreground/80 text-lg md:text-xl font-light tracking-wide max-w-3xl mx-auto mb-16">
            Warszawa · Rumunia · Grecja · Bułgaria · Salina Turda
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="glass-panel rounded-xl p-6 text-center">
              <div className="text-primary/70 text-xs uppercase tracking-widest mb-2">{stat.label}</div>
              <div className="text-white font-serif text-xl md:text-2xl">{stat.value}</div>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <Button 
            onClick={scrollToRoute}
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg rounded-none w-full sm:w-auto"
          >
            <Map className="mr-2 h-5 w-5" />
            Zacznij podróż
          </Button>
          <Button 
            onClick={onOpenPdf}
            size="lg" 
            variant="outline"
            className="border-primary/50 text-primary hover:bg-primary/10 px-8 py-6 text-lg rounded-none w-full sm:w-auto"
          >
            <Download className="mr-2 h-5 w-5" />
            Pobierz PDF Planu
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-primary/50"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="h-8 w-8" />
      </motion.div>
    </section>
  );
}
