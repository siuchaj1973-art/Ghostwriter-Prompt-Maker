import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function Navbar({ onOpenPdf }: { onOpenPdf: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-primary/10 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <div 
          className="text-2xl font-serif font-bold text-primary cursor-pointer tracking-wider"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          PB2026
        </div>
        
        <div className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-widest font-medium text-foreground/80">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-primary transition-colors">Hero</button>
          <button onClick={() => scrollTo("dashboard")} className="hover:text-primary transition-colors">Dashboard</button>
          <button onClick={() => scrollTo("trasa")} className="hover:text-primary transition-colors">Trasa</button>
          <button onClick={() => scrollTo("doswiadczenia")} className="hover:text-primary transition-colors">Doświadczenia</button>
        </div>
        
        <Button 
          onClick={onOpenPdf}
          className="bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          <Download className="mr-2 h-4 w-4" />
          Pobierz PDF
        </Button>
      </div>
    </motion.nav>
  );
}
