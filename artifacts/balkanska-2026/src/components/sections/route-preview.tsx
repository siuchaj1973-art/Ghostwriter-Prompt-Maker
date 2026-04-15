import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, Hotel, Clock, Lightbulb, X, ZoomIn } from "lucide-react";

interface Stop {
  day: string;
  dayRange: string;
  country: string;
  flag: string;
  city: string;
  subtitle: string;
  photos: { url: string; caption: string }[];
  hotel: string;
  duration: string;
  description: string;
  highlights: string[];
  tip: string;
}

const stops: Stop[] = [
  {
    day: "Dzień 1",
    dayRange: "10.08.2026",
    country: "Polska",
    flag: "🇵🇱",
    city: "Krosno",
    subtitle: "Baza Startowa",
    hotel: "Nocleg Prywatny",
    duration: "Tranzyt przygotowawczy",
    description:
      "Krosno – malownicze miasto w sercu polskich Karpat, znane z wielowiekowej tradycji hutnictwa szkła artystycznego oraz pięknie zachowanej starówki z XV-wieczną architekturą. To nasza baza wypadowa przed wielką przygodą. Ostatni nocleg w kraju przed wyruszeniem na południe Europy – czas na finalne przygotowania, sprawdzenie Cadillaca i pożegnanie z Polską.",
    highlights: [
      "Przygotowanie Cadillaca Escalade ESV do 3500 km trasy",
      "Rynek w Krośnie – zabytkowa starówka z XV wieku",
      "Muzeum Podkarpackie i Muzeum Szkła Artystycznego",
      "Ostatnia polska kolacja przed wyruszeniem",
    ],
    tip: "Zatankuj do pełna w Polsce – paliwo za granicą jest droższe. Sprawdź ciśnienie w oponach i stan oleju w Escaladzie. Zabierz vigniety na Słowację i Węgry.",
    photos: [
      { url: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=900&q=85", caption: "Otwarta droga – start przygody" },
      { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85", caption: "Karpaty – nasza pierwsza góra" },
      { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85", caption: "Polska starówka przed wyruszeniem" },
    ],
  },
  {
    day: "Dzień 2–3",
    dayRange: "11–12.08.2026",
    country: "Węgry",
    flag: "🇭🇺",
    city: "Nyíregyháza",
    subtitle: "Sóstó Zoo & Termy",
    hotel: "Hotel Pangea ⭐⭐⭐⭐",
    duration: "2 dni",
    description:
      "Nyíregyháza to miasto w północno-wschodnich Węgrzech, które skrywa jedno z najpiękniejszych i największych zoo w Europie Środkowej – Sóstó Zoo. Ponad 500 gatunków zwierząt żyje tu na ogromnych, naturalistycznych wybiegach. Wieczorami ogromna przyjemność czeka w słynnych termach Sóstó, gdzie kilkanaście basenów z gorącą wodą leczniczą pozwoli odpocząć po pierwszym etapie drogi.",
    highlights: [
      "Sóstó Zoo – 500+ gatunków, wybiegi na wolnym powietrzu",
      "Orangutany, słonie, żyrafy, lemury – fauna z całego świata",
      "Termy Sóstó – baseny termalne z wodą leczniczą 35–38°C",
      "Safari nocne – unikalne doświadczenie tylko dla rodzin",
      "Stare Miasto Nyíregyháza – piękna architektura secesyjna",
    ],
    tip: "Sóstó Zoo otwarte od 9:00. Bilety lepiej kupić online – kolejki w sierpniu bywają długie. Karnet rodzinny 2+3 to znaczna oszczędność. Termy najlepiej wieczorem po zoo.",
    photos: [
      { url: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=900&q=85", caption: "Sóstó Zoo – egzotyczne gatunki" },
      { url: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=900&q=85", caption: "Dzikie zwierzęta w naturalnym otoczeniu" },
      { url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=85", caption: "Termy Sóstó – relaks po podróży" },
    ],
  },
  {
    day: "Dzień 4–5",
    dayRange: "13–14.08.2026",
    country: "Rumunia",
    flag: "🇷🇴",
    city: "Sibiu",
    subtitle: "Trasa Transfăgărășan",
    hotel: "Hilton Sibiu ⭐⭐⭐⭐⭐",
    duration: "1 dzień na trasie",
    description:
      "Transfăgărășan to jedna z najbardziej spektakularnych dróg świata – 90 km asfaltu, który wije się przez Karpaty Południowe na wysokość 2042 m n.p.m. Budowana w latach 1970–1974 na rozkaz Ceaușescu jako droga strategiczna, dziś jest mekką motocyklistów, kierowców i fotografów. Jeremy Clarkson nazwał ją najlepszą drogą świata. Punkt kulminacyjny to Przełęcz Balea Lac ze szmaragdowym jeziorem górskim. Sibiu – zwane Małym Paryżem – zachwyca pięknie zachowaną starówką.",
    highlights: [
      "Transfăgărășan – 90 km serpentyn przez serce Karpat",
      "Przełęcz Balea Lac (2034 m n.p.m.) – górskie jezioro",
      "Jezioro Vidraru – ogromna zapora z panoramicznym widokiem",
      "Zamek Poenari – prawdziwa siedziba Vlada Palownika",
      "Sibiu Stare Miasto – Plac Wielki i gotyckie kamienice",
    ],
    tip: "Transfăgărășan otwarta tylko od ok. 1 lipca do końca października. Wyrusz przed 8:00 – popołudniu zatłoczona. Temperatura na przełęczy może być o 15°C niższa niż w dolinie – weź kurtkę!",
    photos: [
      { url: "https://images.unsplash.com/photo-1626861775901-97fae0e0f8a9?w=900&q=85", caption: "Transfăgărășan – serpentyny przez Karpaty" },
      { url: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=900&q=85", caption: "Jezioro Balea na szczycie przełęczy" },
      { url: "https://images.unsplash.com/photo-1559674498-b2f9d48bf4d7?w=900&q=85", caption: "Sibiu – Małe Paryże Rumunii" },
    ],
  },
  {
    day: "Dzień 6–7",
    dayRange: "15–16.08.2026",
    country: "Rumunia",
    flag: "🇷🇴",
    city: "Braszów",
    subtitle: "Zamek Bran & Twierdza Râșnov",
    hotel: "Kronwell Brasov ⭐⭐⭐⭐",
    duration: "1 dzień zwiedzania",
    description:
      "Braszów to gotyckie serce Transylwanii – miasto założone przez Krzyżaków w XIII wieku, pełne wąskich uliczek i kolorowych kamienic. Zamek Bran, powszechnie nazywany zamkiem Drakuli, to jeden z najbardziej fotografowanych zamków Europy – monumentalna budowla zawieszona na skale, z tarasami z widokiem na dolinę. Twierdza Râșnov wznosi się 15 km dalej na skale 200 m ponad miastem, oferując zapierające dech panoramy Karpat.",
    highlights: [
      "Zamek Bran – symbol Transylwanii, tzw. zamek Drakuli",
      "Twierdza Râșnov – średniowieczna cytadela na skale",
      "Braszów Stare Miasto – Czarny Kościół gotycki z XIV w.",
      "Kolejka linowa na szczyt Tampa z panoramą miasta",
      "Kolacja w tradycyjnej transylwańskiej gospodzie",
    ],
    tip: "Zamek Bran czynny od wtorku do niedzieli (poniedziałek zamknięty). Twierdza Râșnov jest 20 minut drogi – idealne połączenie na jeden dzień. Zarezerwuj stolik na kolację w centrum Braszowa z wyprzedzeniem.",
    photos: [
      { url: "https://images.unsplash.com/photo-1534008757030-27299c4371b6?w=900&q=85", caption: "Zamek Bran – symbol Transylwanii" },
      { url: "https://images.unsplash.com/photo-1562512941-6571bf4302f9?w=900&q=85", caption: "Twierdza Râșnov nad doliną" },
      { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85", caption: "Stare Miasto Braszów o zmierzchu" },
    ],
  },
  {
    day: "Dzień 8–9",
    dayRange: "17–18.08.2026",
    country: "Bułgaria",
    flag: "🇧🇬",
    city: "Bansko",
    subtitle: "Monastyr Rylski & Kempinski SPA",
    hotel: "Kempinski Bansko ⭐⭐⭐⭐⭐",
    duration: "1 dzień + SPA wieczorem",
    description:
      "Monastyr Rylski to najświętsze miejsce Bułgarii – wpisane na listę UNESCO w 1983 roku. Założony w X wieku przez św. Joanna Rylskiego, przetrwał wieki najazdów, pożarów i odbudów. Freski pokrywające każdy centymetr kwadratowy dziedzińca i świątyni to arcydzieło bułgarskiego malarstwa ikonowego z XIX wieku. Wieczorami luksusowy odpoczynek w Kempinski Bansko – pięciogwiazdkowym resorcie SPA u stóp Rodopów, z basenami, saunami i gastronomią na najwyższym poziomie.",
    highlights: [
      "Monastyr Rylski – UNESCO, duchowe centrum Bułgarii",
      "Freski z XIX w. – tysiące ikon i malowideł na dziedzińcu",
      "Gorge Rilska – malowniczy wąwóz prowadzący do klasztoru",
      "Kempinski Bansko SPA – baseny, sauny, masaże premium",
      "Bansko – zabytkowe centrum z kamiennymi XVIII-wiecznymi domami",
    ],
    tip: "Monastyr Rylski czynny codziennie 8:00–20:00, wstęp do kościoła bezpłatny. Dress code: zakryte ramiona i kolana. Odległość z Bansko ok. 60 km malowniczą drogą. Wróć na SPA przed 17:00.",
    photos: [
      { url: "https://images.unsplash.com/photo-1571406252241-db0280bd36cd?w=900&q=85", caption: "Monastyr Rylski – perła UNESCO" },
      { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85", caption: "Góry Rodopu – krajobraz po drodze" },
      { url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=85", caption: "Kempinski Bansko – luksusowe SPA" },
    ],
  },
  {
    day: "Dzień 10–13",
    dayRange: "19–22.08.2026",
    country: "Grecja",
    flag: "🇬🇷",
    city: "Saloniki",
    subtitle: "Meteory & Olimp",
    hotel: "Lazart Hotel ⭐⭐⭐⭐",
    duration: "4 dni",
    description:
      "Saloniki – drugie co do wielkości miasto Grecji i stolica greckiej Macedonii, tętniące życiem na styku starożytności i nowoczesności. Stąd wyruszamy na dwie wielkie wyprawy: do Meteorów – grupy skał porośniętych klasztorami wpisanymi na listę UNESCO, gdzie mnisi żyli dosłownie ponad chmurami. Oraz na Olimp – najwyższą górę Grecji i mityczny dom bogów. Saloniki same w sobie zachwycają Białą Wieżą, wczesnochrześcijańskimi bazylikami i słynną kuchnią.",
    highlights: [
      "Meteory – 6 klasztorów na pionowych skałach (UNESCO)",
      "Wielkie Meteory – największy i najstarszy monastyr regionu",
      "Olimp – Mytikas 2918 m, trekking na górę bogów",
      "Saloniki – Biała Wieża, Rotunda, Agora Rzymska",
      "Thessaloniki Food Tour – ouzo, bougatsa, souvlaki",
    ],
    tip: "Meteory najlepiej rano przed 10:00 lub wieczorem. Każdy klasztor ma inny dzień zamknięcia – sprawdź harmonogram online. Olimp: wejście na Mytikas wymaga dobrej kondycji i co najmniej 8 godzin.",
    photos: [
      { url: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=900&q=85", caption: "Meteory – klasztory nad przepaścią" },
      { url: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=900&q=85", caption: "Grecki pejzaż wybrzeża Salonik" },
      { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=85", caption: "Widok z Olimpu na Grecję" },
    ],
  },
  {
    day: "Dzień 14–16",
    dayRange: "23–25.08.2026",
    country: "Grecja",
    flag: "🇬🇷",
    city: "Pelion",
    subtitle: "Ukryte Plaże & Wioski",
    hotel: "Valis Resort ⭐⭐⭐⭐⭐",
    duration: "3 dni relaksu",
    description:
      "Pelion to mityczna kraina Centaurów – półwysep pełen zielonych lasów, kamiennych wiosek z archontiko i ukrytych plaż z turkusową wodą, do których można dotrzeć tylko pieszo lub łódką. Valis Resort to jeden z najpiękniejszych hoteli w całej Grecji, z nieskończonym basenem zawieszonym nad zatoką. Plaże Mylopotamos i Fakistra to rajskie miejsca, które wygrywają w rankingach najpiękniejszych plaż Europy, a mimo to pozostają cicho ukryte przed masową turystyką.",
    highlights: [
      "Plaża Mylopotamos – szmaragdowa woda, jaskinie morskie",
      "Plaża Fakistra – dostępna tylko pieszo, praktycznie dzika",
      "Portaria i Makrinitsa – kamienne wioski nad chmurami",
      "Damouchari – wioska rybacka, plener z Mamma Mia",
      "Valis Resort infinity pool nad Zatoką Pagazetyjską",
    ],
    tip: "Do Mylopotamos schodzi się 30 min kamienną ścieżką – idź rano, po południu zatłoczona. Zabierz snorkeling – podwodne skały pełne ryb. Łódź z Horefto do Fakistra kosztuje ok. 10 EUR za osobę.",
    photos: [
      { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=85", caption: "Ukryta plaża na Pelionie" },
      { url: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=900&q=85", caption: "Turkusowe wody Zatoki Pagazetyjskiej" },
      { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=85", caption: "Valis Resort – infinity pool nad morzem" },
    ],
  },
  {
    day: "Dzień 17",
    dayRange: "26.08.2026",
    country: "Bułgaria",
    flag: "🇧🇬",
    city: "Tyrnowo",
    subtitle: "Twierdza Tsarevets",
    hotel: "Yantra Grand Hotel ⭐⭐⭐⭐",
    duration: "1 dzień",
    description:
      "Wielkie Tyrnowo (Veliko Tarnovo) – dawna stolica Drugiego Carstwa Bułgarskiego z XII–XIV w., uważana za jedno z najpiękniejszych miast na Bałkanach. Twierdza Tsarevets wznosi się dramatycznie nad rzeką Jantrą, a każdy wieczór zamienia się w spektakl – Show Świateł i Muzyki opowiada historię bułgarskich carów barwami reflektorów na murach. Wąskie uliczki dzielnicy Varosha, stary bazar Samovodska Charshia i panorama rzeki z murów to obowiązkowe punkty programu.",
    highlights: [
      "Twierdza Tsarevets – siedziba carów bułgarskich XII–XIV w.",
      "Sound & Light Show – wieczorny pokaz świateł na murach",
      "Samovodska Charshia – XIX-wieczny bazar rzemieślniczy",
      "Panorama rzeki Jantry z murów obronnych o zachodzie",
      "Arbanasi – XVII-wieczna wioska z freskami kościelnymi",
    ],
    tip: "Sound and Light Show odbywa się co wieczór ok. 21:00–22:00 – kup bilet dzień wcześniej (ok. 10 BGN). Twierdza czynna 8:00–19:00, wejście ok. 5 EUR. Widok z murów o zachodzie słońca jest wyjątkowy.",
    photos: [
      { url: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=900&q=85", caption: "Twierdza Tsarevets o zmierzchu" },
      { url: "https://images.unsplash.com/photo-1559674498-b2f9d48bf4d7?w=900&q=85", caption: "Panorama rzeki Jantry" },
      { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85", caption: "Stare Miasto Tyrnowo nocą" },
    ],
  },
  {
    day: "Dzień 18",
    dayRange: "27.08.2026",
    country: "Rumunia",
    flag: "🇷🇴",
    city: "Turda",
    subtitle: "Salina Turda – Podziemny Kosmos",
    hotel: "SunGarden Salina ⭐⭐⭐⭐",
    duration: "1 dzień",
    description:
      "Salina Turda to jedno z najbardziej zaskakujących miejsc w całej Europie – XVIII-wieczna kopalnia soli zamieniona w futurystyczny park rozrywki 100 metrów pod ziemią. Ogromne, katedralne komnaty wydrążone w skale solnej kryją amfiteatr, boisko, mini-golf, kolumbus i jezioro z łódkami. Temperatura stała 12°C przez cały rok sprawia, że nawet w sierpniowy upał wchodzi się jak do naturalnej klimatyzacji. Powietrze nasycone solą ma udokumentowane działanie lecznicze na układ oddechowy.",
    highlights: [
      "Komnata Rudolfa – gigantyczna przestrzeń z amfiteatrem",
      "Jezioro solne z łódkami wewnątrz kopalni",
      "Mini-golf, bilard, boisko 100 m pod ziemią",
      "Koło panoramiczne w komorze solnej",
      "Haloterapia – lecznicze powietrze solne dla alergików",
    ],
    tip: "Bilety 35–45 RON (dorośli), dzieci do 5 lat bezpłatnie. Temperatura 12°C przez cały rok – koniecznie weź kurtkę! Kasa otwarta 9:00–17:00, ostatnie wejście 16:00. Parkowanie bezpłatne przy kopalni.",
    photos: [
      { url: "https://images.unsplash.com/photo-1519905522028-11f9d5e4e9b1?w=900&q=85", caption: "Salina Turda – podziemny świat" },
      { url: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=900&q=85", caption: "Jezioro solne wewnątrz kopalni" },
      { url: "https://images.unsplash.com/photo-1534008757030-27299c4371b6?w=900&q=85", caption: "Komnaty solne – architektura podziemia" },
    ],
  },
  {
    day: "Dzień 19",
    dayRange: "28.08.2026",
    country: "Polska",
    flag: "🇵🇱",
    city: "Powrót",
    subtitle: "Finał Wielkiej Przygody",
    hotel: "—",
    duration: "Dzień podróży",
    description:
      "Ostatni etap – ponad 900 km przez Słowację i Czechy z powrotem do Warszawy. 19 dni, 3500 km, 5 krajów, 9 miast, jedno niezapomniane lato rodzinne. Cadillac Escalade niósł nas przez Karpaty, przez Bałkany, nad Olimp i z powrotem – i dowozi bezpiecznie do domu. W bagażniku: wspomnienia na całe życie, setki zdjęć z Transfăgărășan, smak greckiego morza na Pelionie, sól z Turdii i opowieści o Drakuli z Transylwanii.",
    highlights: [
      "Trasa powrotu: Turda → Kluż → Bratysława → Warszawa",
      "Podsumowanie: 3500 km, 5 krajów, 9 noclegów premium",
      "Cadillac ESV – ok. 475 litrów paliwa przez całą trasę",
      "Ekipa: 5 osób + Kot – wszyscy zdrowi i szczęśliwi",
      "Planowanie kolejnego roadtripu rodzinnego 2027",
    ],
    tip: "Zaplanuj dwie przerwy: przy Brnie i na granicy polskiej. Słowacja i Czechy wymagają winiety – sprawdź przed wyjazdem. Dotankuj do pełna przed wjazdem do Polski. Dobrej drogi!",
    photos: [
      { url: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=900&q=85", caption: "Droga do domu – koniec przygody" },
      { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85", caption: "Zachód słońca nad górami" },
      { url: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=900&q=85", caption: "Wspomnienia z podróży życia" },
    ],
  },
];

export function RoutePreview() {
  const [selected, setSelected] = useState<number>(0);
  const [photoIdx, setPhotoIdx] = useState<number>(0);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const stop = stops[selected];

  const selectStop = (i: number) => {
    setSelected(i);
    setPhotoIdx(0);
  };

  const nextPhoto = () => setPhotoIdx((p) => (p + 1) % stop.photos.length);
  const prevPhoto = () => setPhotoIdx((p) => (p - 1 + stop.photos.length) % stop.photos.length);

  return (
    <div className="flex flex-col lg:flex-row gap-0 rounded-2xl overflow-hidden border border-primary/20 shadow-2xl min-h-[700px]">

      {/* ── LEFT PANEL: lista przystanków ── */}
      <div className="lg:w-72 xl:w-80 shrink-0 bg-[#0F1115] border-b lg:border-b-0 lg:border-r border-primary/10 overflow-y-auto max-h-[300px] lg:max-h-none">
        <div className="p-4 border-b border-primary/10">
          <p className="text-primary text-xs uppercase tracking-[0.2em] font-semibold">Przystanki trasy</p>
        </div>
        <ul className="divide-y divide-white/5">
          {stops.map((s, i) => (
            <li key={i}>
              <button
                onClick={() => selectStop(i)}
                className={`w-full text-left px-4 py-3.5 transition-all duration-200 flex items-center gap-3 group ${
                  selected === i
                    ? "bg-primary/15 border-l-2 border-primary"
                    : "hover:bg-white/5 border-l-2 border-transparent"
                }`}
              >
                <span className="text-xl shrink-0">{s.flag}</span>
                <div className="min-w-0">
                  <p className={`text-sm font-semibold truncate ${selected === i ? "text-primary" : "text-white group-hover:text-white/90"}`}>
                    {s.city}
                  </p>
                  <p className="text-white/40 text-xs truncate">{s.day} · {s.dayRange}</p>
                </div>
                {selected === i && (
                  <ChevronRight size={14} className="text-primary ml-auto shrink-0" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* ── RIGHT PANEL: szczegóły ── */}
      <div className="flex-1 flex flex-col bg-[#1A1D23] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col h-full"
          >
            {/* Galeria zdjęć */}
            <div className="relative h-72 md:h-80 shrink-0 overflow-hidden bg-black">
              <AnimatePresence mode="wait">
                <motion.img
                  key={photoIdx}
                  src={stop.photos[photoIdx].url}
                  alt={stop.photos[photoIdx].caption}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                  className="w-full h-full object-cover cursor-zoom-in"
                  onClick={() => setLightbox(stop.photos[photoIdx].url)}
                />
              </AnimatePresence>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1D23] via-transparent to-black/30 pointer-events-none" />

              {/* Caption */}
              <div className="absolute bottom-3 left-4 right-16">
                <p className="text-white/60 text-xs">{stop.photos[photoIdx].caption}</p>
              </div>

              {/* Zoom icon */}
              <button
                onClick={() => setLightbox(stop.photos[photoIdx].url)}
                className="absolute top-3 right-3 p-2 rounded-lg bg-black/40 backdrop-blur-sm text-white/60 hover:text-white hover:bg-black/60 transition-all"
              >
                <ZoomIn size={16} />
              </button>

              {/* Photo nav arrows */}
              {stop.photos.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white/70 hover:text-white hover:bg-black/70 transition-all"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white/70 hover:text-white hover:bg-black/70 transition-all"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}

              {/* Photo dots */}
              <div className="absolute bottom-3 right-4 flex gap-1.5">
                {stop.photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPhotoIdx(i)}
                    className={`rounded-full transition-all duration-200 ${
                      i === photoIdx ? "w-4 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-white/40"
                    }`}
                  />
                ))}
              </div>

              {/* Thumbnail strip */}
              <div className="absolute bottom-0 left-0 right-0 flex gap-2 px-4 pb-10 pt-2 opacity-0 hover:opacity-100 transition-opacity">
                {stop.photos.map((ph, i) => (
                  <button
                    key={i}
                    onClick={() => setPhotoIdx(i)}
                    className={`h-12 w-20 rounded-md overflow-hidden border-2 transition-all shrink-0 ${
                      i === photoIdx ? "border-primary" : "border-transparent opacity-60 hover:opacity-90"
                    }`}
                  >
                    <img src={ph.url} alt={ph.caption} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable info */}
            <div className="flex-1 overflow-y-auto p-5 md:p-7 space-y-5">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs uppercase tracking-widest text-primary font-semibold">{stop.day} · {stop.dayRange}</span>
                  <span className="text-white/20">·</span>
                  <span className="text-xs text-white/40">{stop.country}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white leading-tight">{stop.city}</h3>
                <p className="text-primary/80 font-serif mt-0.5">{stop.subtitle}</p>
              </div>

              {/* Meta badges */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
                  <Hotel size={13} className="text-primary" />
                  <span className="text-white/70 text-xs">{stop.hotel}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
                  <Clock size={13} className="text-primary" />
                  <span className="text-white/70 text-xs">{stop.duration}</span>
                </div>
              </div>

              {/* Opis */}
              <div>
                <p className="text-xs uppercase tracking-widest text-primary/60 font-semibold mb-2 flex items-center gap-1.5">
                  <MapPin size={11} /> Opis atrakcji
                </p>
                <p className="text-white/75 text-sm leading-relaxed">{stop.description}</p>
              </div>

              {/* Co zobaczyć */}
              <div>
                <p className="text-xs uppercase tracking-widest text-primary/60 font-semibold mb-2">Co zobaczyć</p>
                <ul className="space-y-1.5">
                  {stop.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                      <span className="text-primary shrink-0 mt-0.5">›</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Wskazówka */}
              <div className="rounded-xl border border-primary/25 bg-primary/5 px-4 py-3">
                <p className="text-primary text-xs uppercase tracking-widest font-semibold mb-1 flex items-center gap-1.5">
                  <Lightbulb size={11} /> Wskazówka podróżnicza
                </p>
                <p className="text-white/65 text-sm leading-relaxed">{stop.tip}</p>
              </div>

              {/* Nav buttons */}
              <div className="flex gap-3 pt-1">
                {selected > 0 && (
                  <button
                    onClick={() => selectStop(selected - 1)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-all text-sm"
                  >
                    <ChevronLeft size={15} /> {stops[selected - 1].city}
                  </button>
                )}
                {selected < stops.length - 1 && (
                  <button
                    onClick={() => selectStop(selected + 1)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/35 bg-primary/8 text-primary hover:bg-primary/15 transition-all text-sm ml-auto"
                  >
                    {stops[selected + 1].city} <ChevronRight size={15} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={lightbox}
              alt="Powiększone zdjęcie"
              className="max-w-full max-h-full rounded-xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
