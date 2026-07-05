import { motion } from "framer-motion";
import { Route, Calendar, Users, Fuel, Car } from "lucide-react";

export function Dashboard() {
  return (
    <section id="dashboard" className="py-24 md:py-32 bg-background relative border-t border-primary/10">
      <div className="mx-auto w-full max-w-[1800px] px-6 md:px-12 2xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
            Dashboard Logistyczny
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="glass-panel p-8 rounded-xl flex flex-col items-center text-center group hover:border-primary/50 transition-colors"
          >
            <div className="bg-primary/10 p-4 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
              <Route className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-2">Dystans</h3>
            <p className="text-2xl font-serif text-white">ok. 3500 km</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="glass-panel p-8 rounded-xl flex flex-col items-center text-center group hover:border-primary/50 transition-colors"
          >
            <div className="bg-primary/10 p-4 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-2">Czas</h3>
            <p className="text-2xl font-serif text-white">19 dni <br/><span className="text-sm font-sans text-primary/80">(10.08 – 28.08)</span></p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="glass-panel p-8 rounded-xl flex flex-col items-center text-center group hover:border-primary/50 transition-colors"
          >
            <div className="bg-primary/10 p-4 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-2">Ekipa</h3>
            <p className="text-2xl font-serif text-white">5 osób + Kot</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="glass-panel p-8 rounded-xl flex flex-col items-center text-center group hover:border-primary/50 transition-colors"
          >
            <div className="bg-primary/10 p-4 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
              <Fuel className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-2">Paliwo</h3>
            <p className="text-2xl font-serif text-white">ok. 450-500 L</p>
            <p className="text-xs text-muted-foreground mt-2">(Cadillac ESV)</p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
          className="glass-panel p-8 md:p-12 rounded-xl flex flex-col md:flex-row items-center gap-8 hover:border-primary/30 transition-colors"
        >
          <div className="bg-primary/5 p-6 rounded-full shrink-0">
            <Car className="h-16 w-16 text-primary" />
          </div>
          <div className="flex-1 w-full text-center md:text-left">
            <h3 className="text-sm uppercase tracking-widest text-primary mb-2">Pojazd</h3>
            <h4 className="text-3xl font-serif text-white mb-6">2017 Cadillac Escalade ESV</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="border-l-2 border-primary/30 pl-4 py-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Silnik</p>
                <p className="text-white font-medium">6.2L V8 420 KM</p>
              </div>
              <div className="border-l-2 border-primary/30 pl-4 py-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Pojemność</p>
                <p className="text-white font-medium">7 osób / bagaże rodzinne</p>
              </div>
              <div className="border-l-2 border-primary/30 pl-4 py-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Zużycie</p>
                <p className="text-white font-medium">~14L/100km (trasa)</p>
              </div>
              <div className="border-l-2 border-primary/30 pl-4 py-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Napęd</p>
                <p className="text-white font-medium">4WD</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
