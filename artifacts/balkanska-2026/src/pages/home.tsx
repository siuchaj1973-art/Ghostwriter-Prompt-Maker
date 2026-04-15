import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Dashboard } from "@/components/sections/dashboard";
import { RouteTable } from "@/components/sections/route-table";
import { Experiences } from "@/components/sections/experiences";
import { Footer } from "@/components/sections/footer";
import { PdfModal } from "@/components/pdf-modal";

export default function Home() {
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <Navbar onOpenPdf={() => setIsPdfModalOpen(true)} />
      <main>
        <Hero onOpenPdf={() => setIsPdfModalOpen(true)} />
        <Dashboard />
        <RouteTable />
        <Experiences />
      </main>
      <Footer onOpenPdf={() => setIsPdfModalOpen(true)} />
      
      <AnimatePresence>
        {isPdfModalOpen && (
          <PdfModal onClose={() => setIsPdfModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
