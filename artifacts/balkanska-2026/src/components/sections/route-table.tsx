import { motion } from "framer-motion";

const routeData = [
  { day: "1", country: "🇵🇱", city: "Krosno", attraction: "Baza startowa", duration: "Tranzyt 1", hotel: "Nocleg Prywatny" },
  { day: "2-3", country: "🇭🇺", city: "Nyíregyháza", attraction: "Sóstó Zoo & Termy", duration: "2 dni", hotel: "Hotel Pangea" },
  { day: "4-5", country: "🇷🇴", city: "Sibiu", attraction: "Trasa Transfăgărășan", duration: "1 dzień", hotel: "Hilton Sibiu" },
  { day: "6-7", country: "🇷🇴", city: "Braszów", attraction: "Zamek Bran & Râșnov", duration: "1 dzień", hotel: "Kronwell Brasov" },
  { day: "8-9", country: "🇧🇬", city: "Bansko", attraction: "Monastyr Rylski", duration: "1 dzień", hotel: "Kempinski Bansko" },
  { day: "10-13", country: "🇬🇷", city: "Saloniki", attraction: "Meteory & Olimp", duration: "4 dni", hotel: "Lazart Hotel" },
  { day: "14-16", country: "🇬🇷", city: "Pelion", attraction: "Ukryte Plaże & Wioski", duration: "3 dni", hotel: "Valis Resort" },
  { day: "17", country: "🇧🇬", city: "Tyrnowo", attraction: "Twierdza Tsarevets", duration: "1 dzień", hotel: "Yantra Grand Hotel" },
  { day: "18", country: "🇷🇴", city: "Turda", attraction: "Salina Turda", duration: "1 dzień", hotel: "SunGarden Salina" },
  { day: "19", country: "🇵🇱", city: "Polska", attraction: "Powrót domowy", duration: "Finał", hotel: "—" },
];

export function RouteTable() {
  return (
    <section id="trasa" className="py-24 md:py-32 bg-card relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
            Plan Trasy – 19 Dni
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
        </motion.div>

        <div className="overflow-x-auto border border-primary/10 rounded-xl glass-panel shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background/80 border-b border-primary/20 text-primary font-serif uppercase tracking-wider text-sm">
                <th className="p-6 font-medium">Dzień</th>
                <th className="p-6 font-medium">Kraj</th>
                <th className="p-6 font-medium">Miasto</th>
                <th className="p-6 font-medium">Atrakcja</th>
                <th className="p-6 font-medium">Deep Dive</th>
                <th className="p-6 font-medium">Hotel</th>
              </tr>
            </thead>
            <tbody>
              {routeData.map((row, index) => (
                <motion.tr 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`group border-b border-white/5 transition-all duration-300 hover:bg-primary/5 relative ${index % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'}`}
                >
                  <td className="p-6 text-white/90 font-medium relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-center"></div>
                    {row.day}
                  </td>
                  <td className="p-6 text-2xl">{row.country}</td>
                  <td className="p-6 text-white font-serif">{row.city}</td>
                  <td className="p-6 text-white/80">{row.attraction}</td>
                  <td className="p-6 text-white/70 text-sm">{row.duration}</td>
                  <td className="p-6 text-primary font-serif">{row.hotel}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
