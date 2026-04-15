import { motion } from "framer-motion";

const experiences = [
  {
    title: "Północny Start",
    country: "Węgry",
    flag: "🇭🇺",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    desc: "Sóstó Zoo to jeden z najlepszych ogrodów zoologicznych w Europie Środkowej. Relaks w termach po pierwszym etapie.",
    hotel: "Hotel Pangea ⭐⭐⭐⭐",
  },
  {
    title: "Góry i Drakula",
    country: "Rumunia",
    flag: "🇷🇴",
    image: "https://images.unsplash.com/photo-1562512941-6571bf4302f9?w=800&q=80",
    desc: "Legendarna droga Transfăgărășan serpentynami przez Karpaty. Zamek Bran – prawdziwa siedziba Drakuli.",
    hotel: "Hilton Sibiu + Kronwell Brasov ⭐⭐⭐⭐⭐",
  },
  {
    title: "SPA pod Monastyrem",
    country: "Bułgaria",
    flag: "🇧🇬",
    image: "https://images.unsplash.com/photo-1571406252241-db0280bd36cd?w=800&q=80",
    desc: "Monastyr Rylski – UNESCO, duchowe centrum Bułgarii. Kempinski Bansko to luksusowe SPA w sercu Rodopów.",
    hotel: "Kempinski Bansko ⭐⭐⭐⭐⭐",
  },
  {
    title: "Meteory i Północ",
    country: "Grecja",
    flag: "🇬🇷",
    image: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80",
    desc: "Meteory – klasztory zawieszone na skałach, cud świata. Saloniki – drugie miasto Grecji, pełne historii i smaku.",
    hotel: "Lazart Hotel ⭐⭐⭐⭐",
  },
  {
    title: "Zielona Oaza Pelion",
    country: "Grecja",
    flag: "🇬🇷",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    desc: "Pelion – mityczna kraina Centaurów, ukryte plaże i wioski z kamiennymi archontiko.",
    hotel: "Valis Resort ⭐⭐⭐⭐⭐",
  },
  {
    title: "Carowie Tyrnowo",
    country: "Bułgaria",
    flag: "🇧🇬",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80",
    desc: "Tyrnowo – dawna stolica Carstwa Bułgarskiego. Twierdza Tsarevets z wieczornym pokazem świateł.",
    hotel: "Yantra Grand Hotel ⭐⭐⭐⭐",
  },
  {
    title: "Podziemny Kosmos",
    country: "Rumunia",
    flag: "🇷🇴",
    image: "https://images.unsplash.com/photo-1519905522028-11f9d5e4e9b1?w=800&q=80",
    desc: "Salina Turda – solna kopalnia zamieniona w futurystyczny park rozrywki pod ziemią. Niezapomniane zakończenie wyprawy.",
    hotel: "SunGarden Salina ⭐⭐⭐⭐",
  }
];

export function Experiences() {
  return (
    <section id="doswiadczenia" className="py-24 md:py-32 bg-background relative border-t border-primary/10">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
            Doświadczenia Premium
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 masonry-grid">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`group relative overflow-hidden rounded-xl bg-card border border-primary/10 ${i === 3 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
            >
              <div className="aspect-[4/3] md:aspect-[3/2] overflow-hidden">
                <img 
                  src={exp.image} 
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  loading="lazy"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end h-full">
                <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs uppercase tracking-widest text-primary font-semibold px-2 py-1 bg-primary/10 rounded-sm border border-primary/20 backdrop-blur-md">
                      {exp.country} {exp.flag}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
                    {exp.title}
                  </h3>
                  
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <p className="text-white/80 text-sm md:text-base mb-4 leading-relaxed font-light">
                      {exp.desc}
                    </p>
                    <div className="inline-block border-b border-primary pb-1">
                      <p className="text-primary font-serif font-medium">
                        {exp.hotel}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
