import { commons, type Photo } from "@/lib/media";

/* ────────────────────────────────────────────────────────────────────────
   PĘTLA BAŁKAŃSKA 2026 — centralny model danych
   Wspólne źródło prawdy dla Planera Trasy, sekcji Hoteli i podglądu trasy.
   Wszystkie zdjęcia to prawdziwe fotografie danej atrakcji (Wikimedia Commons).
   ──────────────────────────────────────────────────────────────────────── */

/** Pierwotne założenia wyjazdu — używane do „dopasowania" hoteli i filtrów. */
export interface Assumption {
  id: string;
  label: string;
  detail: string;
}

export const ASSUMPTIONS: Assumption[] = [
  { id: "rodzina", label: "Rodzina 5 osób + Kot", detail: "Pokoje rodzinne lub 2 połączone; przyjazny zwierzętom (pet-friendly)." },
  { id: "premium", label: "Standard premium 4–5★", detail: "Komfort, śniadania, dobra opinia (8.5+); butikowy lub sieciowy top." },
  { id: "parking", label: "Duży parking dla Cadillaca ESV", detail: "Escalade ESV ma 5,7 m długości — potrzebny parking/garaż bez ciasnych zakrętów." },
  { id: "dzieci", label: "Atrakcje dla dzieci", detail: "Basen / SPA / aquapark / zoo w pobliżu — dzień relaksu między przejazdami." },
  { id: "blisko", label: "Blisko głównej atrakcji", detail: "Maks. kilkanaście minut od celu etapu, by ograniczyć dojazdy." },
  { id: "sierpien", label: "Termin 10–28.08.2026", detail: "Pełnia sezonu — rezerwacja z wyprzedzeniem, klimatyzacja obowiązkowa." },
];

/* ── Kategorie atrakcji ─────────────────────────────────────────────────── */

export type Category =
  | "gory"
  | "zamek"
  | "klasztor"
  | "miasto"
  | "plaza"
  | "aquapark"
  | "podziemia"
  | "natura";

export interface CategoryMeta {
  id: Category;
  label: string;
  /** nazwa ikony z lucide-react */
  icon: string;
}

export const CATEGORIES: CategoryMeta[] = [
  { id: "gory", label: "Góry i drogi", icon: "Mountain" },
  { id: "zamek", label: "Zamki i twierdze", icon: "Castle" },
  { id: "klasztor", label: "Klasztory", icon: "Church" },
  { id: "miasto", label: "Miasta i starówki", icon: "Landmark" },
  { id: "plaza", label: "Plaże i wioski", icon: "Waves" },
  { id: "aquapark", label: "Aquaparki i termy", icon: "Droplets" },
  { id: "podziemia", label: "Podziemia", icon: "Gem" },
  { id: "natura", label: "Natura i zoo", icon: "Trees" },
];

/* ── Atrakcje ───────────────────────────────────────────────────────────── */

export interface Attraction {
  id: string;
  name: string;
  city: string;
  country: string;
  flag: string;
  category: Category;
  /** Sugerowany etap trasy (Dzień X) */
  dayHint: string;
  /** Orientacyjny czas zwiedzania */
  duration: string;
  lat: number;
  lng: number;
  summary: string;
  highlights: string[];
  tip: string;
  photos: Photo[];
  /** Hotel z pierwotnego planu przypisany do bazy etapu */
  baseHotelId: string;
}

export const ATTRACTIONS: Attraction[] = [
  {
    id: "krosno",
    name: "Krosno — Rynek i Muzeum Szkła",
    city: "Krosno",
    country: "Polska",
    flag: "🇵🇱",
    category: "miasto",
    dayHint: "Dzień 1 · 10.08",
    duration: "2–3 h",
    lat: 49.6886,
    lng: 21.7706,
    summary:
      "Malownicza baza startowa w sercu polskich Karpat — zabytkowy rynek z podcieniami i słynne szkło artystyczne. Ostatni nocleg w kraju przed wyruszeniem na południe.",
    highlights: [
      "Renesansowy Rynek z podcieniami z XV–XVII w.",
      "Centrum Dziedzictwa Szkła — pokazy hutnicze na żywo",
      "Ostatnie przygotowanie Cadillaca ESV do 3500 km",
    ],
    tip: "Zatankuj do pełna w Polsce — paliwo za granicą jest droższe. Sprawdź ciśnienie w oponach i olej. Zabierz winiety na Słowację i Węgry.",
    photos: [
      commons("Krosno-Market Square-Panorama-03.JPG", "Rynek w Krośnie — renesansowe podcienia"),
      commons("Krosno - market square (by Pudelek).JPG", "Kamienice przy krośnieńskim rynku"),
    ],
    baseHotelId: "krosno-prywatny",
  },
  {
    id: "sosto-zoo",
    name: "Sóstó Zoo & Termy",
    city: "Nyíregyháza",
    country: "Węgry",
    flag: "🇭🇺",
    category: "natura",
    dayHint: "Dzień 2–3 · 11–12.08",
    duration: "cały dzień",
    lat: 47.9876,
    lng: 21.7402,
    summary:
      "Jedno z największych i najpiękniejszych zoo Europy Środkowej — ponad 500 gatunków na naturalistycznych wybiegach — oraz słynne termy i park wodny Sóstó tuż obok.",
    highlights: [
      "Sóstó Zoo — 500+ gatunków, wybiegi naturalistyczne",
      "Orangutany, żyrafy i słonie afrykańskie w plenerze",
      "Termy Sóstó — baseny termalne 35–38°C na wieczór",
    ],
    tip: "Zoo otwarte od 9:00, bilety online (kolejki w sierpniu). Karnet rodzinny 2+3 to duża oszczędność. Plan: Zoo rano → Aquarius po południu → Termy wieczorem.",
    photos: [
      commons("Omnia Sóstó Gelateria, 2017 Sóstógyógyfürdő.jpg", "Sóstógyógyfürdő — kurort przy zoo w Nyíregyháza"),
    ],
    baseHotelId: "hotel-pangea",
  },
  {
    id: "aquarius",
    name: "Aquarius Experience & Park Bath",
    city: "Nyíregyháza",
    country: "Węgry",
    flag: "🇭🇺",
    category: "aquapark",
    dayHint: "Dzień 2–3 · 11–12.08",
    duration: "4–5 h",
    lat: 47.9899,
    lng: 21.7461,
    summary:
      "Jeden z najlepszych aquaparków wschodniej Europy — 5 minut pieszo od Sóstó Zoo. Zjeżdżalnie Kamikaze i Black Hole, basen z falami i strefa termalna czynna cały rok.",
    highlights: [
      "Kamikaze i Black Hole — ekstremalne zjeżdżalnie",
      "Wave Pool — sztuczne fale i Wild River",
      "Elephant Slide i strefa dla najmłodszych",
    ],
    tip: "Sezon letni (VI–IX); część indoor czynna cały rok. Bilet łączony Zoo + Aquarius to duża oszczędność.",
    photos: [
      commons("Omnia Sóstó Gelateria, 2017 Sóstógyógyfürdő.jpg", "Kompleks wypoczynkowy Sóstó w Nyíregyháza"),
    ],
    baseHotelId: "hotel-pangea",
  },
  {
    id: "transfagarasan",
    name: "Transfăgărășan",
    city: "Sibiu",
    country: "Rumunia",
    flag: "🇷🇴",
    category: "gory",
    dayHint: "Dzień 4–5 · 13–14.08",
    duration: "cały dzień",
    lat: 45.6017,
    lng: 24.6172,
    summary:
      "Jedna z najbardziej spektakularnych dróg świata — 90 km serpentyn przez Karpaty Południowe na 2042 m n.p.m. Jeremy Clarkson nazwał ją najlepszą drogą na świecie.",
    highlights: [
      "90 km serpentyn przez Karpaty Południowe",
      "Przełęcz Bâlea Lac (2034 m) — jezioro ze śniegiem",
      "Jezioro Vidraru i zapora na rzece Argeș",
    ],
    tip: "Droga otwarta ok. 1 lipca – koniec października. Wyrusz przed 8:00 — popołudnie jest zatłoczone. Na przełęczy bywa o 15°C zimniej!",
    photos: [
      commons("Transfagarasan-north.JPG", "Transfăgărășan — północne serpentyny"),
      commons("Transfagarasean.JPG", "Widok z góry na wstęgę Transfăgărășan"),
    ],
    baseHotelId: "hilton-sibiu",
  },
  {
    id: "poenari",
    name: "Zamek Poenari",
    city: "Arefu",
    country: "Rumunia",
    flag: "🇷🇴",
    category: "zamek",
    dayHint: "Dzień 4–5 · 13–14.08",
    duration: "2 h (1480 schodów)",
    lat: 45.3547,
    lng: 24.6353,
    summary:
      "Prawdziwa górska siedziba Vlada Palownika — ruiny twierdzy na iglicy skalnej nad doliną Argeș, do których prowadzi 1480 schodów. Znacznie bardziej autentyczna niż turystyczny Bran.",
    highlights: [
      "Prawdziwa forteca Vlada III Drakuli",
      "1480 schodów przez las na skalną iglicę",
      "Widok na jezioro i dolinę Argeș u stóp Transfăgărășan",
    ],
    tip: "Zamknięte gdy w okolicy pojawiają się niedźwiedzie — sprawdź komunikaty. Idealne połączenie z przejazdem Transfăgărășan.",
    photos: [
      commons("Poenari Castle in Romania.jpg", "Zamek Poenari na skalnej iglicy"),
      commons("Cetatea Poenari - vedere principala.JPG", "Ruiny twierdzy Poenari"),
    ],
    baseHotelId: "hilton-sibiu",
  },
  {
    id: "sibiu",
    name: "Sibiu — Piața Mare",
    city: "Sibiu",
    country: "Rumunia",
    flag: "🇷🇴",
    category: "miasto",
    dayHint: "Dzień 4–5 · 13–14.08",
    duration: "2–3 h",
    lat: 45.7970,
    lng: 24.1519,
    summary:
      "Zwane „Małym Paryżem” saskie miasto z barwnymi kamienicami i słynnymi „oczami” na dachach. Idealne zwieńczenie dnia na Transfăgărășan — kolacja i wino na Wielkim Placu.",
    highlights: [
      "Piața Mare — Wielki Plac z domami-oczami",
      "Most Kłamców i historyczne centrum",
      "Saska architektura i tarasy widokowe",
    ],
    tip: "Zaparkuj poza starówką (strefa piesza). Wieczorem place pięknie się rozświetlają — zostań na kolację.",
    photos: [
      commons("Sibiu (Hermannstadt, Nagyszeben) - Large Square (Piața Mare, Großer Ring).jpg", "Sibiu — Piața Mare"),
      commons("Centrul Istoric Sibiu - Piata Mare.jpg", "Historyczne centrum Sibiu"),
    ],
    baseHotelId: "hilton-sibiu",
  },
  {
    id: "bran",
    name: "Zamek Bran (Zamek Drakuli)",
    city: "Bran",
    country: "Rumunia",
    flag: "🇷🇴",
    category: "zamek",
    dayHint: "Dzień 6–7 · 15–16.08",
    duration: "2–3 h",
    lat: 45.5149,
    lng: 25.3672,
    summary:
      "Gotycka forteca dramatycznie wznosząca się na skale, strzegąca przełęczy karpackiej — najsłynniejszy „zamek Drakuli” i symbol Transylwanii.",
    highlights: [
      "Gotyckie wnętrza i tajemne przejście",
      "Ekspozycja o micie Drakuli i królowej Marii",
      "Bazar z pamiątkami u stóp zamku",
    ],
    tip: "Zamek zamknięty w poniedziałki. Przyjedź na otwarcie (9:00) — po południu bywają duże kolejki. Twierdza Râșnov jest 20 min drogi.",
    photos: [
      commons("Bran Castle (23714307153).jpg", "Zamek Bran na skale"),
      commons("Bran Castle (Dracula's Castle) 1.jpg", "Gotycka bryła zamku Bran"),
      commons("Bran Castle - Castelul Bran.JPG", "Zamek Bran — Castelul Bran"),
    ],
    baseHotelId: "kronwell-brasov",
  },
  {
    id: "rasnov",
    name: "Twierdza Râșnov",
    city: "Râșnov",
    country: "Rumunia",
    flag: "🇷🇴",
    category: "zamek",
    dayHint: "Dzień 6–7 · 15–16.08",
    duration: "1,5–2 h",
    lat: 45.5844,
    lng: 25.4606,
    summary:
      "Średniowieczna cytadela chłopska górująca 200 m nad miastem — jedna z najlepiej zachowanych twierdz obronnych Rumunii, z panoramą 360° na Karpaty.",
    highlights: [
      "XIV-wieczna cytadela na wzgórzu",
      "Panorama 360° na dolinę i góry",
      "Najgłębsza studnia twierdzy (146 m)",
    ],
    tip: "Na górę wjeżdża kolejka linowo-terenowa. Świetne połączenie w jednym dniu z zamkiem Bran.",
    photos: [
      commons("Cetatea Rasnov si orasul.JPG", "Twierdza Râșnov nad miastem"),
      commons("Cetatea rasnov exterior.jpg", "Mury cytadeli Râșnov"),
    ],
    baseHotelId: "kronwell-brasov",
  },
  {
    id: "brasov",
    name: "Braszów — Piața Sfatului",
    city: "Brașov",
    country: "Rumunia",
    flag: "🇷🇴",
    category: "miasto",
    dayHint: "Dzień 6–7 · 15–16.08",
    duration: "2–3 h",
    lat: 45.6427,
    lng: 25.5887,
    summary:
      "Gotyckie serce Transylwanii założone przez Krzyżaków w XIII w. — barokowy Plac Rady, Czarny Kościół i jedna z najwęższych uliczek Europy.",
    highlights: [
      "Czarny Kościół — największa gotycka świątynia regionu",
      "Piața Sfatului — barokowy Plac Rady",
      "Ulica Sznurkowa (Strada Sforii) i kolejka na Tâmpę",
    ],
    tip: "Wjedź kolejką na szczyt Tâmpa (960 m) po napis „BRAȘOV” i panoramę. Aquapark Paradisul Acvatic to opcja na deszcz.",
    photos: [
      commons("Piata Sfatului in Council Square, Brasov, Romania.jpg", "Braszów — Piața Sfatului"),
      commons("Black Church Brasov.jpg", "Czarny Kościół w Braszowie"),
    ],
    baseHotelId: "kronwell-brasov",
  },
  {
    id: "rila",
    name: "Monastyr Rylski",
    city: "Rila",
    country: "Bułgaria",
    flag: "🇧🇬",
    category: "klasztor",
    dayHint: "Dzień 8–9 · 17–18.08",
    duration: "3–4 h",
    lat: 42.1340,
    lng: 23.3403,
    summary:
      "Najświętsze miejsce Bułgarii (UNESCO), założone w X w. przez św. Jana Rylskiego. Pasiaste arkady dziedzińca i tysiące fresków to arcydzieło ikonografii bałkańskiej.",
    highlights: [
      "Cerkiew Narodzenia z pasiastymi arkadami",
      "Freski XIX w. — tysiące malowideł na dziedzińcu",
      "Wąwóz Rilska i górska sceneria Riły",
    ],
    tip: "Wstęp bezpłatny, czynne 8:00–20:00. Zakryte ramiona i kolana obowiązkowe. Ok. 60 km górską drogą z Bansko — wróć na SPA przed 17:00.",
    photos: [
      commons("Rila Monastery (Рилски манастир) - by Pudelek.JPG", "Monastyr Rylski — pasiaste arkady"),
      commons("Rila Monastery Easter Night 01.JPG", "Dziedziniec klasztoru Rylskiego"),
      commons("Religious fresco in Rila Monastery.jpg", "Freski klasztoru Rylskiego"),
    ],
    baseHotelId: "kempinski-bansko",
  },
  {
    id: "bansko",
    name: "Bansko i góry Pirin",
    city: "Bansko",
    country: "Bułgaria",
    flag: "🇧🇬",
    category: "miasto",
    dayHint: "Dzień 8–9 · 17–18.08",
    duration: "2 h + SPA",
    lat: 41.8380,
    lng: 23.4884,
    summary:
      "Kamienne miasteczko u stóp Pirinu z XVIII-wiecznymi domami i mechaną z lokalną kuchnią — baza SPA w luksusowym Kempinski pod bałkańskimi szczytami.",
    highlights: [
      "Brukowana starówka i XVIII-wieczne kamienne domy",
      "Muzeum Neofita Rilskiego",
      "Panorama masywu Pirin (UNESCO) i wieczór w SPA",
    ],
    tip: "Spróbuj bansko starets i czorby w tradycyjnej mechanie. Wieczór zarezerwuj na baseny i sauny Kempinski.",
    photos: [
      commons("Pirin Street in Bansko (48867823688).jpg", "Kamienna uliczka w Bansko"),
      commons("Pirin-mountains-Bansko.jpg", "Góry Pirin nad Bansko"),
    ],
    baseHotelId: "kempinski-bansko",
  },
  {
    id: "meteora",
    name: "Meteory",
    city: "Kalambaka",
    country: "Grecja",
    flag: "🇬🇷",
    category: "klasztor",
    dayHint: "Dzień 10–13 · 19–22.08",
    duration: "pół dnia",
    lat: 39.7217,
    lng: 21.6306,
    summary:
      "Sześć prawosławnych klasztorów zawieszonych na pionowych skalnych iglicach (UNESCO) — jeden z najbardziej nieziemskich krajobrazów Europy.",
    highlights: [
      "Wielki Meteor — największy i najstarszy monastyr",
      "Klasztor Roussanou i Świętej Trójcy nad przepaścią",
      "Zachód słońca z tarasów widokowych",
    ],
    tip: "Najlepiej rano przed 10:00 lub wieczorem. Każdy klasztor ma inny dzień zamknięcia — sprawdź harmonogram. Zakryte ramiona i kolana.",
    photos: [
      commons("Greece meteora monasteries.JPG", "Meteory — klasztory na skałach"),
      commons("Meteora Main Monastery.jpg", "Wielki Meteor"),
      commons("Monastery of the Holy Trinity, Meteora 01.jpg", "Klasztor Świętej Trójcy w Meteorach"),
    ],
    baseHotelId: "lazart-hotel",
  },
  {
    id: "olimp",
    name: "Olimp — góra bogów",
    city: "Litochoro",
    country: "Grecja",
    flag: "🇬🇷",
    category: "gory",
    dayHint: "Dzień 10–13 · 19–22.08",
    duration: "dzień / trekking",
    lat: 40.0857,
    lng: 22.3585,
    summary:
      "Najwyższa góra Grecji (Mytikas 2918 m) — mityczny dom bogów. Nawet krótki spacer z Prionii przez Litochoro daje przedsmak olimpijskiej scenerii.",
    highlights: [
      "Szczyt Mytikas 2918 m — tron Zeusa",
      "Wąwóz Enipeas i miasteczko Litochoro",
      "Riwiera Olimpijska — plaże u stóp góry",
    ],
    tip: "Wejście na Mytikas to min. 8 godzin i doświadczenie górskie. Dla rodziny lepszy łatwy szlak wąwozem Enipeas i plaża Plaka Litochoro.",
    photos: [
      commons("Mount Olimpus Mitikas Peak.jpg", "Szczyt Mytikas na Olimpie"),
      commons("Mytikas.jpg", "Masyw Olimpu"),
    ],
    baseHotelId: "lazart-hotel",
  },
  {
    id: "saloniki",
    name: "Saloniki — Biała Wieża",
    city: "Saloniki",
    country: "Grecja",
    flag: "🇬🇷",
    category: "miasto",
    dayHint: "Dzień 10–13 · 19–22.08",
    duration: "pół dnia",
    lat: 40.6264,
    lng: 22.9483,
    summary:
      "Drugie miasto Grecji — tętniąca nadmorska promenada, Biała Wieża, wczesnochrześcijańskie bazyliki i jedna z najlepszych kuchni w kraju.",
    highlights: [
      "Biała Wieża — symbol miasta",
      "Nadmorska promenada i Ano Poli (górne miasto)",
      "Food tour: bougatsa, souvlaki, ouzo",
    ],
    tip: "Baza wypadowa do Meteorów (2,5 h) i Olimpu (1 h). Zaparkuj przy nabrzeżu i zwiedzaj pieszo.",
    photos: [
      commons("White Tower in Thessaloniki.jpg", "Biała Wieża w Salonikach"),
      commons("The White Tower of Thessaloniki, Greece.jpg", "Nabrzeże Salonik z Białą Wieżą"),
    ],
    baseHotelId: "lazart-hotel",
  },
  {
    id: "mylopotamos",
    name: "Plaża Mylopotamos (Pelion)",
    city: "Tsagarada",
    country: "Grecja",
    flag: "🇬🇷",
    category: "plaza",
    dayHint: "Dzień 14–16 · 23–25.08",
    duration: "cały dzień",
    lat: 39.3667,
    lng: 23.2000,
    summary:
      "Szmaragdowa plaża Pelionu z morską skalną bramą i jaskiniami — regularnie w rankingach najpiękniejszych plaż Europy, a wciąż zaskakująco kameralna.",
    highlights: [
      "Szmaragdowa woda i skalna brama między zatoczkami",
      "Snorkeling wśród skał pełnych ryb",
      "Tawerny nad klifem z widokiem na Egejskie",
    ],
    tip: "Do plaży schodzi się ok. 10–15 min ścieżką i schodami — przyjedź rano po miejsce. Zabierz snorkeling i wodę.",
    photos: [
      commons("Beach Mylopotamos.jpg", "Plaża Mylopotamos ze skalną bramą"),
    ],
    baseHotelId: "valis-resort",
  },
  {
    id: "makrinitsa",
    name: "Makrinitsa — Balkon Pelionu",
    city: "Makrinitsa",
    country: "Grecja",
    flag: "🇬🇷",
    category: "plaza",
    dayHint: "Dzień 14–16 · 23–25.08",
    duration: "2–3 h",
    lat: 39.4033,
    lng: 22.9922,
    summary:
      "Kamienna wioska Centaurów zwana „Balkonem Pelionu” — archontika, brukowane uliczki i taras widokowy na całą Zatokę Pagazetyjską i Wolos.",
    highlights: [
      "Kamienne archontika i platanowy plac",
      "Taras widokowy na Zatokę Pagazetyjską",
      "Freski w kościele Panagia i lokalne tsipouro",
    ],
    tip: "Zaparkuj przy wjeździe — wioska jest pieszo. Kawa na platanowym placu o zachodzie słońca to must.",
    photos: [
      commons("Makrinitsa village in Volos Greece.jpg", "Makrinitsa nad Zatoką Pagazetyjską"),
      commons("Makrinitsa6.JPG", "Kamienne uliczki Makrinitsy"),
    ],
    baseHotelId: "valis-resort",
  },
  {
    id: "tsarevets",
    name: "Twierdza Tsarewec",
    city: "Wielkie Tyrnowo",
    country: "Bułgaria",
    flag: "🇧🇬",
    category: "zamek",
    dayHint: "Dzień 17 · 26.08",
    duration: "2–3 h",
    lat: 43.0817,
    lng: 25.6553,
    summary:
      "Warowne wzgórze dawnej stolicy Drugiego Carstwa Bułgarskiego nad meandrem rzeki Jantry — co wieczór ożywa spektaklem świateł i dźwięku opowiadającym historię carów.",
    highlights: [
      "Cytadela carów nad meandrem Jantry",
      "Sound & Light Show — wieczorny pokaz na murach",
      "Cerkiew patriarchalna na szczycie wzgórza",
    ],
    tip: "Twierdza czynna 8:00–19:00 (wstęp ~10 lv). Sprawdź termin pokazu świateł — zwykle w sezonie i przy grupach. Widok z murów o zachodzie jest fenomenalny.",
    photos: [
      commons("Veliko Tarnovo (Велико Търново) - Tsarevets.JPG", "Twierdza Tsarewec nad Jantrą"),
      commons("Fortress at Veliko Tarnovo.JPG", "Mury Tsarewec w Wielkim Tyrnowie"),
      commons("Baldwin's Tower of Tsarevets.JPG", "Wieża Baldwina na Tsarewec"),
    ],
    baseHotelId: "yantra-grand",
  },
  {
    id: "salina-turda",
    name: "Salina Turda",
    city: "Turda",
    country: "Rumunia",
    flag: "🇷🇴",
    category: "podziemia",
    dayHint: "Dzień 18 · 27.08",
    duration: "3–4 h",
    lat: 46.5875,
    lng: 23.7869,
    summary:
      "XVIII-wieczna kopalnia soli zamieniona w futurystyczny park rozrywki 100 m pod ziemią — amfiteatr, koło panoramiczne i podziemne jezioro z łódkami w komorze Rudolf.",
    highlights: [
      "Komora Rudolf — amfiteatr i koło panoramiczne",
      "Podziemne jezioro solne z łódkami",
      "Haloterapia — lecznicze powietrze solne (12°C)",
    ],
    tip: "Stała temperatura 12°C przez cały rok — koniecznie kurtka! Bilety 35–45 RON, ostatnie wejście 16:00, parking bezpłatny.",
    photos: [
      commons("Salina Turda, Mina Terezia.JPG", "Salina Turda — komora Terezja"),
      commons("Salina Turda 5.jpg", "Podziemne jezioro z łódkami w Salina Turda"),
      commons("Roumanie Mine de sel de Turda 2019 1.jpg", "Koło panoramiczne 100 m pod ziemią"),
    ],
    baseHotelId: "sungarden-salina",
  },
];

/* ── Domyślna (pierwotna) trasa — kolejność id atrakcji ─────────────────── */

export const DEFAULT_ROUTE: string[] = [
  "krosno",
  "sosto-zoo",
  "transfagarasan",
  "sibiu",
  "bran",
  "rasnov",
  "rila",
  "bansko",
  "meteora",
  "saloniki",
  "mylopotamos",
  "makrinitsa",
  "tsarevets",
  "salina-turda",
];

/* ── Hotele ─────────────────────────────────────────────────────────────── */

export interface Hotel {
  id: string;
  name: string;
  stars: number;
  city: string;
  country: string;
  flag: string;
  /** Etap trasy, którego dotyczy */
  stage: string;
  /** Poziom cenowy */
  priceTier: "$$" | "$$$" | "$$$$";
  /** Z pierwotnego planu czy alternatywa */
  origin: "plan" | "alternatywa";
  /** id atrakcji, przy której leży hotel */
  nearAttractionId: string;
  /** id założeń, które hotel spełnia */
  matches: string[];
  /** Uzasadnienie dopasowania */
  why: string;
}

/** Link do wyszukiwarki Booking.com dla hotelu w danym mieście. */
export function bookingUrl(h: Hotel): string {
  const q = encodeURIComponent(`${h.name} ${h.city}`);
  return `https://www.booking.com/searchresults.html?ss=${q}`;
}

/** Link do Google Maps dla hotelu. */
export function hotelMapUrl(h: Hotel): string {
  const q = encodeURIComponent(`${h.name} ${h.city} ${h.country}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export const HOTELS: Hotel[] = [
  {
    id: "hotel-pangea",
    name: "Hotel Pangea",
    stars: 4,
    city: "Nyíregyháza",
    country: "Węgry",
    flag: "🇭🇺",
    stage: "Dzień 2–3 · Sóstó Zoo & Termy",
    priceTier: "$$",
    origin: "plan",
    nearAttractionId: "sosto-zoo",
    matches: ["rodzina", "dzieci", "blisko", "parking"],
    why: "Nowoczesny hotel w strefie Sóstó, kilka minut od zoo, aquaparku Aquarius i term — idealny na 2 dni z dziećmi. Rodzinne pokoje i własny parking dla dużego auta.",
  },
  {
    id: "hilton-sibiu",
    name: "Hilton Sibiu",
    stars: 5,
    city: "Sibiu",
    country: "Rumunia",
    flag: "🇷🇴",
    stage: "Dzień 4–5 · Transfăgărășan & Sibiu",
    priceTier: "$$$",
    origin: "plan",
    nearAttractionId: "sibiu",
    matches: ["premium", "parking", "sierpien", "dzieci"],
    why: "Pięciogwiazdkowa baza po całym dniu na Transfăgărășan — basen i SPA na regenerację, klimatyzacja i duży, bezpieczny parking dla Escalade ESV.",
  },
  {
    id: "kronwell-brasov",
    name: "Kronwell Brașov",
    stars: 4,
    city: "Brașov",
    country: "Rumunia",
    flag: "🇷🇴",
    stage: "Dzień 6–7 · Bran, Râșnov & Braszów",
    priceTier: "$$",
    origin: "plan",
    nearAttractionId: "brasov",
    matches: ["premium", "parking", "dzieci", "blisko"],
    why: "Designerski hotel z basenem i strefą fitness, blisko starówki Braszowa i tras do Bran i Râșnov. Podziemny garaż rozwiązuje problem parkowania dużego SUV-a.",
  },
  {
    id: "kempinski-bansko",
    name: "Kempinski Hotel Grand Arena Bansko",
    stars: 5,
    city: "Bansko",
    country: "Bułgaria",
    flag: "🇧🇬",
    stage: "Dzień 8–9 · Monastyr Rylski & SPA",
    priceTier: "$$$",
    origin: "plan",
    nearAttractionId: "bansko",
    matches: ["premium", "dzieci", "parking", "sierpien"],
    why: "Luksusowy resort u stóp Pirinu z rozbudowanym SPA i basenami — nagroda za górski dzień w Monastyrze Rylskim. Rodzinne apartamenty i garaż.",
  },
  {
    id: "lazart-hotel",
    name: "Lazart Hotel",
    stars: 4,
    city: "Saloniki",
    country: "Grecja",
    flag: "🇬🇷",
    stage: "Dzień 10–13 · Meteory, Olimp & Saloniki",
    priceTier: "$$",
    origin: "plan",
    nearAttractionId: "saloniki",
    matches: ["premium", "parking", "sierpien"],
    why: "Wygodna, dobrze skomunikowana baza na 4 noce w Salonikach — z dala od wąskich uliczek centrum, z parkingiem, blisko wyjazdówki na Meteory i Olimp.",
  },
  {
    id: "valis-resort",
    name: "Valis Resort",
    stars: 5,
    city: "Volos / Pelion",
    country: "Grecja",
    flag: "🇬🇷",
    stage: "Dzień 14–16 · Ukryte plaże Pelionu",
    priceTier: "$$$",
    origin: "plan",
    nearAttractionId: "makrinitsa",
    matches: ["premium", "dzieci", "sierpien", "parking"],
    why: "Nadmorski resort z basenem infinity i prywatną plażą nad Zatoką Pagazetyjską — 3 dni relaksu, idealny wypad do plaż Pelionu i Makrinitsy.",
  },
  {
    id: "yantra-grand",
    name: "Yantra Grand Hotel",
    stars: 4,
    city: "Wielkie Tyrnowo",
    country: "Bułgaria",
    flag: "🇧🇬",
    stage: "Dzień 17 · Twierdza Tsarewec",
    priceTier: "$$",
    origin: "plan",
    nearAttractionId: "tsarevets",
    matches: ["blisko", "premium", "sierpien"],
    why: "Legendarny taras z widokiem wprost na twierdzę Tsarewec i pokaz świateł — najlepsza lokalizacja w mieście na wieczorny spektakl, z parkingiem hotelowym.",
  },
  {
    id: "sungarden-salina",
    name: "Hotel SunGarden Turda",
    stars: 4,
    city: "Turda",
    country: "Rumunia",
    flag: "🇷🇴",
    stage: "Dzień 18 · Salina Turda",
    priceTier: "$$",
    origin: "plan",
    nearAttractionId: "salina-turda",
    matches: ["premium", "dzieci", "parking", "blisko"],
    why: "Rozległy resort ogrodowy z basenami i SPA blisko Salina Turda — komfortowy finał trasy przed powrotem, z ogromnym parkingiem i pokojami rodzinnymi.",
  },
  {
    id: "krosno-prywatny",
    name: "Nocleg prywatny / apartament",
    stars: 3,
    city: "Krosno",
    country: "Polska",
    flag: "🇵🇱",
    stage: "Dzień 1 · Baza startowa",
    priceTier: "$$",
    origin: "plan",
    nearAttractionId: "krosno",
    matches: ["rodzina", "parking"],
    why: "Elastyczny nocleg tranzytowy w Krośnie z miejscem na spokojne zapakowanie auta i bezpiecznym parkingiem przed startem w trasę.",
  },
  /* ── Alternatywy dopasowane do założeń ── */
  {
    id: "ramada-sibiu",
    name: "Ramada Sibiu",
    stars: 4,
    city: "Sibiu",
    country: "Rumunia",
    flag: "🇷🇴",
    stage: "Dzień 4–5 · alternatywa dla Sibiu",
    priceTier: "$$",
    origin: "alternatywa",
    nearAttractionId: "sibiu",
    matches: ["rodzina", "parking", "dzieci"],
    why: "Tańsza alternatywa dla Hiltona z basenem i dużym parkingiem — dobra opcja, jeśli premium w Sibiu jest wyprzedane w szczycie sezonu.",
  },
  {
    id: "kempinski-thessaloniki",
    name: "The Met Hotel Thessaloniki",
    stars: 5,
    city: "Saloniki",
    country: "Grecja",
    flag: "🇬🇷",
    stage: "Dzień 10–13 · alternatywa dla Salonik",
    priceTier: "$$$",
    origin: "alternatywa",
    nearAttractionId: "saloniki",
    matches: ["premium", "dzieci", "parking"],
    why: "Pięciogwiazdkowa alternatywa z basenem na dachu i parkingiem — jeśli rodzina woli wyższy standard na 4-nocnej bazie w Salonikach.",
  },
];

/* ── Pomocnicze ─────────────────────────────────────────────────────────── */

/** Odległość po ortodromie (haversine) między dwoma punktami, w km. */
export function haversineKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const la1 = (a.lat * Math.PI) / 180;
  const la2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/**
 * Szacunkowa długość trasy w km — suma odcinków między kolejnymi
 * przystankami po ortodromie, z narzutem 1.3 na rzeczywisty przebieg dróg.
 */
export function routeDistanceKm(ids: string[]): number {
  const pts = ids.map(attractionById).filter(Boolean) as Attraction[];
  let sum = 0;
  for (let i = 1; i < pts.length; i++) sum += haversineKm(pts[i - 1], pts[i]);
  return Math.round((sum * 1.3) / 10) * 10;
}

export function attractionById(id: string): Attraction | undefined {
  return ATTRACTIONS.find((a) => a.id === id);
}

export function hotelById(id: string): Hotel | undefined {
  return HOTELS.find((h) => h.id === id);
}

export function categoryMeta(id: Category): CategoryMeta {
  return CATEGORIES.find((c) => c.id === id)!;
}

export function assumptionById(id: string): Assumption | undefined {
  return ASSUMPTIONS.find((a) => a.id === id);
}
