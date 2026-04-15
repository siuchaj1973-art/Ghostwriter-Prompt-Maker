import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, Calendar, Hotel, Camera, Compass, Star } from "lucide-react";

const steps = [
  {
    day: "Dzień 1",
    dayRange: "10.08.2026",
    country: "Polska",
    flag: "🇵🇱",
    city: "Krosno",
    subtitle: "Baza Startowa",
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=1600&q=85",
    hotel: "Nocleg Prywatny",
    duration: "Tranzyt przygotowawczy",
    description:
      "Krosno – miasto w sercu polskich Karpat, znane z hutnictwa szkła i historycznego starówki. To nasza baza wypadowa przed wielką przygodą. Ostatni nocleg w kraju przed wyruszeniem na południe Europy – czas na finalne przygotowania, pakowanie i pożegnanie z Polską.",
    highlights: [
      "Przygotowanie Cadillaca Escalade ESV do długiej trasy",
      "Rynek w Krośnie – zabytkowa starówka z XV wieku",
      "Muzeum Podkarpackie i Muzeum Szkła",
      "Ostatnia polska kolacja przed wyruszeniem",
    ],
    tip: "Zatankuj do pełna w Polsce – paliwo za granicą jest droższe. Sprawdź ciśnienie w oponach i stan oleju w Escaladzie.",
    color: "#D4AF37",
    gradient: "from-[#0a0a0f] via-[#0F1115]/80 to-transparent",
  },
  {
    day: "Dzień 2–3",
    dayRange: "11–12.08.2026",
    country: "Węgry",
    flag: "🇭🇺",
    city: "Nyíregyháza",
    subtitle: "Sóstó Zoo & Termy",
    image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=1600&q=85",
    hotel: "Hotel Pangea ⭐⭐⭐⭐",
    duration: "2 dni",
    description:
      "Nyíregyháza kryje jeden z największych i najpiękniejszych ogrodów zoologicznych w Europie Środkowej – Sóstó Zoo. Ponad 500 gatunków zwierząt na malowniczych, naturalnych wybiegach. Wieczorami relaks w słynnych termach Sóstó, gdzie gorące źródła lecznicze mają dobroczynny wpływ po długiej podróży.",
    highlights: [
      "Sóstó Zoo – 500+ gatunków zwierząt, wybiegi naturalne",
      "Orangutany, słonie, żyrafy, lemury w wolnych wybiegach",
      "Termy Sóstó – baseny termalne z wodą leczniczą",
      "Safari nocne – unikalne doświadczenie dla dzieci",
      "Stare Miasto Nyíregyháza – architektura secesyjna",
    ],
    tip: "Sóstó Zoo otwarte od 9:00. Warto kupić bilety online – kolejki mogą być długie w sierpniu. Karnet rodzinny to duża oszczędność.",
    color: "#D4AF37",
    gradient: "from-[#0a0a0f] via-[#0F1115]/80 to-transparent",
  },
  {
    day: "Dzień 4–5",
    dayRange: "13–14.08.2026",
    country: "Rumunia",
    flag: "🇷🇴",
    city: "Sibiu",
    subtitle: "Trasa Transfăgărășan",
    image: "https://images.unsplash.com/photo-1626861775901-97fae0e0f8a9?w=1600&q=85",
    hotel: "Hilton Sibiu ⭐⭐⭐⭐⭐",
    duration: "1 dzień na trasie",
    description:
      "Transfăgărășan to jedna z najbardziej spektakularnych dróg świata – 90 km asfaltu wspinającego się przez Karpaty Południowe na wysokość 2042 m n.p.m. Budowana w latach 1970–74 przez Ceaușescu jako droga strategiczna. Dziś mekka motocyklistów, kierowców i fotografów. Przełęcz Balea Lac z szmaragdowym jeziorem górskim to punkt kulminacyjny trasy.",
    highlights: [
      "Serpentyny Transfăgărășan – 90 km przez serce Karpat",
      "Przełęcz Balea Lac (2034 m) – górskie jezioro i schronisko",
      "Jezioro Vidraru – zapora z panoramicznym widokiem",
      "Zamek Poenari – prawdziwa siedziba Vlada Palownika",
      "Sibiu – Małe Paryskie, jedno z najpiękniejszych miast Rumunii",
    ],
    tip: "Trasa Transfăgărășan jest otwarta tylko od ok. 1 lipca do końca października. Wyrusz rano – popołudnie jest zatłoczone. Temperatura na przełęczy może być o 15°C niższa niż w dolinie.",
    color: "#D4AF37",
    gradient: "from-[#0a0a0f] via-[#0F1115]/80 to-transparent",
  },
  {
    day: "Dzień 6–7",
    dayRange: "15–16.08.2026",
    country: "Rumunia",
    flag: "🇷🇴",
    city: "Braszów",
    subtitle: "Zamek Bran & Twierdza Râșnov",
    image: "https://images.unsplash.com/photo-1534008757030-27299c4371b6?w=1600&q=85",
    hotel: "Kronwell Brasov ⭐⭐⭐⭐",
    duration: "1 dzień zwiedzania",
    description:
      "Braszów to gotyckie serce Transylwanii – miasto założone przez Krzyżaków w XIII wieku. Zamek Bran, błędnie nazywany zamkiem Drakuli, to jeden z najbardziej fotografowanych zamków Europy. Twierdza Râșnov wznosi się na skale, oferując zapierające dech panoramy doliny. Stare Miasto Braszów z Czarnym Kościołem to obowiązkowy punkt programu.",
    highlights: [
      "Zamek Bran – symbol Transylwanii, tzw. zamek Drakuli",
      "Twierdza Râșnov – średniowieczna cytadela na skale",
      "Braszów Stare Miasto – Czarny Kościół i Plac Rady",
      "Kolejka linowa na szczyt Tampa z panoramą miasta",
      "Kolacja w tradycyjnej transylwańskiej gospodzie",
    ],
    tip: "Zamek Bran jest czynny od wtorku do niedzieli (poniedziałki zamknięte). Twierdza Râșnov jest 20 min drogi – idealne połączenie na jeden dzień. Zarezerwuj stolik na kolację w centrum wcześniej.",
    color: "#D4AF37",
    gradient: "from-[#0a0a0f] via-[#0F1115]/80 to-transparent",
  },
  {
    day: "Dzień 8–9",
    dayRange: "17–18.08.2026",
    country: "Bułgaria",
    flag: "🇧🇬",
    city: "Bansko",
    subtitle: "Monastyr Rylski & Kempinski SPA",
    image: "https://images.unsplash.com/photo-1571406252241-db0280bd36cd?w=1600&q=85",
    hotel: "Kempinski Bansko ⭐⭐⭐⭐⭐",
    duration: "1 dzień + SPA",
    description:
      "Monastyr Rylski – najświętsze miejsce Bułgarii, wpisane na listę UNESCO w 1983 roku. Założony w X wieku przez św. Joanna Rylskiego, przetrwał wieki najazdów i pożarów. Freski w głównej świątyni to arcydzieło bułgarskiego malarstwa ikonowego. Wieczorami luksusowy odpoczynek w Kempinski Bansko – jednym z najlepszych hoteli SPA na Bałkanach.",
    highlights: [
      "Monastyr Rylski – UNESCO, duchowa stolica Bułgarii",
      "Freski z XIX wieku – tysiące ikon i malowideł",
      "Gorge Rilska – malowniczy wąwóz przy klasztorze",
      "Kempinski SPA – baseny, sauny, masaże po dniu zwiedzania",
      "Bansko – zabytkowe centrum z kamiennymi domami",
    ],
    tip: "Monastyr Rylski jest otwarty codziennie 8:00–20:00, wstęp wolny do kościoła. Dress code: zakryte ramiona i kolana. Odległość z Bansko to ok. 60 km malowniczą drogą górską.",
    color: "#D4AF37",
    gradient: "from-[#0a0a0f] via-[#0F1115]/80 to-transparent",
  },
  {
    day: "Dzień 10–13",
    dayRange: "19–22.08.2026",
    country: "Grecja",
    flag: "🇬🇷",
    city: "Saloniki",
    subtitle: "Meteory & Olimp",
    image: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=1600&q=85",
    hotel: "Lazart Hotel ⭐⭐⭐⭐",
    duration: "4 dni",
    description:
      "Saloniki – drugie co do wielkości miasto Grecji, tętniące życiem na styku starożytności i nowoczesności. Stąd wypadowa baza do dwóch cudów natury: Meteorów – skał z zawieszonymi klasztorami (UNESCO) oraz Olimpu – najwyższej góry Grecji, domu bogów greckich. Saloniki same w sobie oferują Białą Wieżę, bazyliki wczesnochrześcijańskie i legendarne smaki",
    highlights: [
      "Meteory – 6 klasztorów na pionowych skałach (UNESCO)",
      "Wielkie Meteory – największy i najstary monastyr",
      "Olimp – Mytikas 2918 m, trekking na górę bogów",
      "Saloniki – Biała Wieża, Rotunda, Agora Rzymska",
      "Thessaloniki Food Tour – ouzo, bougatsa, souvlaki",
    ],
    tip: "Meteory najlepiej rano (przed 10:00) lub wieczorem. Klasztory rotacyjnie zamknięte różne dni tygodnia – sprawdź harmonogram. Olimp: wejście na Mytikas wymaga dobrej kondycji i całego dnia.",
    color: "#D4AF37",
    gradient: "from-[#0a0a0f] via-[#0F1115]/80 to-transparent",
  },
  {
    day: "Dzień 14–16",
    dayRange: "23–25.08.2026",
    country: "Grecja",
    flag: "🇬🇷",
    city: "Pelion",
    subtitle: "Ukryte Plaże & Wioski",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=85",
    hotel: "Valis Resort ⭐⭐⭐⭐⭐",
    duration: "3 dni relaksu",
    description:
      "Pelion to mityczna kraina Centaurów, półwysep pełen zielonych lasów, kamiennych wiosek i ukrytych plaż z turkusową wodą. Valis Resort to jeden z najlepszych hoteli w Grecji – bezpośrednio nad zatoką, z nieskończonym basenem nad morzem. Plaże Mylopotamos, Fakistra i Damouchari są dostępne tylko pieszo lub łodzią – prawdziwy skarb ukryty przed masową turystyką.",
    highlights: [
      "Plaża Mylopotamos – szmaragdowa woda, jaskinie",
      "Plaża Fakistra – dostępna tylko pieszo, rajski zakątek",
      "Portaria i Makrinitsa – kamienne wioski nad chmurami",
      "Damouchari – wioska rybacka, scena z Mamma Mia",
      "Valis Resort infinite pool nad Zatoką Pagazetyjską",
    ],
    tip: "Do plaży Mylopotamos schodzi się 30 min kamienną ścieżką. Idź rano – po południu zatłoczona. Weź wodę i snorkeling – podwodne skały pełne ryb. Łódź z Horefto do Fakistra – 15 min i masz plażę prawie dla siebie.",
    color: "#D4AF37",
    gradient: "from-[#0a0a0f] via-[#0F1115]/80 to-transparent",
  },
  {
    day: "Dzień 17",
    dayRange: "26.08.2026",
    country: "Bułgaria",
    flag: "🇧🇬",
    city: "Tyrnowo",
    subtitle: "Twierdza Tsarevets",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1600&q=85",
    hotel: "Yantra Grand Hotel ⭐⭐⭐⭐",
    duration: "1 dzień",
    description:
      "Wielkie Tyrnowo (Veliko Tarnovo) – dawna stolica Drugiego Carstwa Bułgarskiego, jedno z najpiękniejszych miast Bałkanów. Twierdza Tsarevets góruje nad rzeką Jantrą, tworząc ikoniczną panoramę. Każdy wieczór twierdza ożywa w spektakularnym pokazie świateł i muzyki – Sound and Light – który opowiada historię bułgarskich carów.",
    highlights: [
      "Twierdza Tsarevets – siedziba carów bułgarskich",
      "Sound & Light Show – wieczorny pokaz świateł na twierdzy",
      "Ulica Samovodska Charshia – rzemieślniczy bazar XIX w.",
      "Panorama rzeki Jantry z murów obronnych",
      "Arbanasi – wioska z XVII-wiecznymi domami",
    ],
    tip: "Sound and Light Show odbywa się co wieczór – sprawdź godzinę na miejscu (ok. 21:00–22:00). Bilet na pokaz kupuj dzień wcześniej. Twierdza jest otwarta 8:00–19:00, wejście ~5 EUR.",
    color: "#D4AF37",
    gradient: "from-[#0a0a0f] via-[#0F1115]/80 to-transparent",
  },
  {
    day: "Dzień 18",
    dayRange: "27.08.2026",
    country: "Rumunia",
    flag: "🇷🇴",
    city: "Turda",
    subtitle: "Salina Turda – Podziemny Kosmos",
    image: "https://images.unsplash.com/photo-1519905522028-11f9d5e4e9b1?w=1600&q=85",
    hotel: "SunGarden Salina ⭐⭐⭐⭐",
    duration: "1 dzień",
    description:
      "Salina Turda to jedno z najbardziej zaskakujących miejsc w Europie – średniowieczna kopalnia soli zamieniona w futurystyczny park rozrywki 100 metrów pod ziemią. Ogromne komnaty z solnymi sklepieniami kryją kino, boisko, mini-golf, kolumbus i stawy z łódkami. Temperatura stała 12°C przez cały rok, powietrze nasycone solą działa leczniczo na drogi oddechowe.",
    highlights: [
      "Komnata Rudolfa – ogromna przestrzeń z amfiteatrem i jeziorkiem",
      "Łódki na podziemnym jeziorze solnym",
      "Mini-golf, bilard, boisko w środku kopalni",
      "Koło panoramiczne w podziemiu",
      "Haloterapia – lecznicze powietrze solne dla alergików",
    ],
    tip: "Wejście 35–45 RON (dorośli). Dzieci poniżej 5 lat – bezpłatnie. Temperatura 12°C przez cały rok – weź kurtkę! Kasa otwarta 9:00–17:00, ostatnie wejście 16:00. Parkowanie przy kopalni.",
    color: "#D4AF37",
    gradient: "from-[#0a0a0f] via-[#0F1115]/80 to-transparent",
  },
  {
    day: "Dzień 19",
    dayRange: "28.08.2026",
    country: "Polska",
    flag: "🇵🇱",
    city: "Powrót do domu",
    subtitle: "Finał wielkiej przygody",
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=1600&q=85",
    hotel: "—",
    duration: "Dzień powrotu",
    description:
      "Ostatni etap – ponad 900 km przez Słowację i Czechy z powrotem do Warszawy. 19 dni, 3500 km, 5 krajów, jedno niezapomniane lato. Cadillac Escalade niósł nas przez Karpaty, Bałkany i Olimp – i dowiezie bezpiecznie do domu. W bagażniku: wspomnienia na całe życie, zdjęcia z Transfăgărășan, smak greckiego morza i sól z Turdii.",
    highlights: [
      "Trasa powrotna: Turda → Kluż → Bratysława → Warszawa",
      "Podsumowanie wyprawy: 3500 km przejechanych",
      "5 krajów, 9 miast, 19 noclegów",
      "Cadillac ESV – 475 litrów paliwa skonsumowanych",
      "Rodzinne wspomnienia na całe życie",
    ],
    tip: "Zaplanuj dwie przerwy na odpoczynek przy trasie – przy Brnie i na granicy polskiej. Sprawdź winiety – Słowacja i Czechy wymagają opłat drogowych. Dotankouj do pełna przed wjazdem do Polski.",
    color: "#D4AF37",
    gradient: "from-[#0a0a0f] via-[#0F1115]/80 to-transparent",
  },
];

export function RoutePreview() {
  const [current, setCurrent] = useState(0);

  const step = steps[current];
  const progress = ((current + 1) / steps.length) * 100;

  const goNext = () => setCurrent((c) => Math.min(c + 1, steps.length - 1));
  const goPrev = () => setCurrent((c) => Math.max(c - 1, 0));

  return (
    <div className="relative">
      {/* Main slide area */}
      <div className="relative min-h-[85vh] overflow-hidden rounded-2xl border border-primary/20 shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.65, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={step.image}
              alt={step.city}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${step.gradient}`} />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Content overlay */}
        <div className="relative z-10 flex flex-col justify-between h-full min-h-[85vh] p-8 md:p-12 lg:p-16">
          {/* Top: step indicator */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{step.flag}</span>
              <div>
                <p className="text-primary text-xs uppercase tracking-[0.25em] font-semibold">
                  {step.day} · {step.dayRange}
                </p>
                <p className="text-white/60 text-sm">{step.country}</p>
              </div>
            </div>
            <div className="text-white/40 text-sm font-mono tabular-nums">
              {current + 1} / {steps.length}
            </div>
          </div>

          {/* Center: main info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${current}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-2xl"
            >
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-2">
                {step.city}
              </h2>
              <p className="text-primary text-lg md:text-xl font-serif mb-6 tracking-wide">
                {step.subtitle}
              </p>

              <p className="text-white/80 text-sm md:text-base leading-relaxed mb-8 max-w-lg font-light">
                {step.description}
              </p>

              {/* Two-column info grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="glass-panel rounded-xl p-4 border border-primary/20">
                  <div className="flex items-center gap-2 text-primary text-xs uppercase tracking-widest mb-2">
                    <Camera size={12} />
                    Co zobaczyć
                  </div>
                  <ul className="space-y-1">
                    {step.highlights.slice(0, 3).map((h, i) => (
                      <li key={i} className="text-white/75 text-sm flex items-start gap-2">
                        <span className="text-primary/60 mt-1 shrink-0">›</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glass-panel rounded-xl p-4 border border-primary/20">
                  <div className="flex items-center gap-2 text-primary text-xs uppercase tracking-widest mb-2">
                    <Hotel size={12} />
                    Nocleg
                  </div>
                  <p className="text-white font-serif text-sm mb-3">{step.hotel}</p>

                  <div className="flex items-center gap-2 text-primary text-xs uppercase tracking-widest mb-2 mt-2">
                    <Compass size={12} />
                    Czas pobytu
                  </div>
                  <p className="text-white/75 text-sm">{step.duration}</p>
                </div>
              </div>

              {/* Tip box */}
              <div className="rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 backdrop-blur-sm">
                <p className="text-primary text-xs uppercase tracking-widest font-semibold mb-1">
                  Wskazówka podróżnicza
                </p>
                <p className="text-white/70 text-sm leading-relaxed">{step.tip}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom: navigation */}
          <div className="flex items-center justify-between mt-6">
            {/* Prev / Next buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={goPrev}
                disabled={current === 0}
                className="group flex items-center gap-2 px-5 py-3 rounded-xl border border-white/20 bg-white/5 hover:border-primary/60 hover:bg-primary/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-sm"
              >
                <ChevronLeft size={18} className="text-white group-hover:text-primary transition-colors" />
                <span className="text-white/70 text-sm hidden sm:inline">Poprzedni</span>
              </button>
              <button
                onClick={goNext}
                disabled={current === steps.length - 1}
                className="group flex items-center gap-2 px-5 py-3 rounded-xl border border-primary/40 bg-primary/10 hover:bg-primary/20 hover:border-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-sm"
              >
                <span className="text-primary text-sm hidden sm:inline">Następny</span>
                <ChevronRight size={18} className="text-primary" />
              </button>
            </div>

            {/* Dot navigation */}
            <div className="flex items-center gap-1.5 flex-wrap max-w-xs justify-end">
              {steps.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  title={`${s.day}: ${s.city}`}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? "w-6 h-2 bg-primary"
                      : "w-2 h-2 bg-white/25 hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar below */}
      <div className="mt-4 px-1">
        <div className="flex items-center justify-between text-xs text-white/40 mb-1.5 font-mono">
          <span>Warszawa</span>
          <span className="text-primary/70">{Math.round(progress)}% trasy</span>
          <span>Powrót</span>
        </div>
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        {/* Stop names under progress bar */}
        <div className="mt-3 grid grid-cols-5 md:grid-cols-10 gap-1">
          {steps.map((s, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`text-center transition-all duration-200 group ${i === current ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
            >
              <div className={`text-base mb-0.5 ${i === current ? "scale-125 inline-block" : ""}`}>
                {s.flag}
              </div>
              <p className={`text-xs leading-tight font-medium truncate ${i === current ? "text-primary" : "text-white/60"}`}>
                {s.city.split(" ")[0]}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
