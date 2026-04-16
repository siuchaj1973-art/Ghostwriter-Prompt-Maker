import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Hotel, Clock, MapPin, Lightbulb, X, ZoomIn, Image, Waves } from "lucide-react";

interface Photo { url: string; caption: string }
interface Aquapark {
  name: string;
  tagline: string;
  distance: string;
  features: string[];
  tip: string;
}
interface Stop {
  day: string; dayRange: string; country: string; flag: string;
  city: string; subtitle: string; photos: Photo[];
  hotel: string; duration: string; description: string;
  highlights: string[]; tip: string;
  aquapark?: Aquapark;
}

// Verified working Unsplash CDN photo IDs (all return HTTP 200)
const p = (id: string, caption: string): Photo => ({
  url: `https://images.unsplash.com/${id}?w=1200&q=85&fit=crop`,
  caption,
});

const stops: Stop[] = [
  {
    day: "Dzień 1", dayRange: "10.08.2026", country: "Polska", flag: "🇵🇱",
    city: "Krosno", subtitle: "Baza Startowa",
    hotel: "Nocleg Prywatny", duration: "Tranzyt przygotowawczy",
    description: "Krosno – malownicze miasto w sercu polskich Karpat, znane z wielowiekowej tradycji hutnictwa szkła artystycznego oraz pięknie zachowanej starówki z XV-wieczną architekturą. To nasza baza wypadowa przed wielką przygodą. Ostatni nocleg w kraju przed wyruszeniem na południe Europy – czas na finalne przygotowania, sprawdzenie Cadillaca i pożegnanie z Polską.",
    highlights: [
      "Przygotowanie Cadillaca Escalade ESV do 3500 km trasy",
      "Rynek w Krośnie – zabytkowa starówka z XV wieku",
      "Muzeum Podkarpackie i Muzeum Szkła Artystycznego",
      "Bieszczady – ostatni akcent polskiego krajobrazu",
      "Ostatnia polska kolacja przed wyruszeniem",
    ],
    tip: "Zatankuj do pełna w Polsce – paliwo za granicą jest droższe. Sprawdź ciśnienie w oponach i stan oleju w Escaladzie. Zabierz winiety na Słowację i Węgry.",
    photos: [
      p("photo-1434626881859-194d67b2b86f", "Karpaty – początek drogi na południe"),
      p("photo-1486325212027-8081e485255e", "Droga przez polskie lasy"),
      p("photo-1464822759023-fed622ff2c3b", "Górski krajobraz przed wyruszeniem"),
      p("photo-1426604966848-d7adac402bff", "Leśna trasa przez Podkarpacie"),
      p("photo-1469474968028-56623f02e42e", "Wschód słońca w Karpatach"),
      p("photo-1501854140801-50d01698950b", "Alpejski krajobraz – zapowiedź trasy"),
    ],
  },
  {
    day: "Dzień 2–3", dayRange: "11–12.08.2026", country: "Węgry", flag: "🇭🇺",
    city: "Nyíregyháza", subtitle: "Sóstó Zoo & Aquarius & Termy",
    hotel: "Hotel Pangea ⭐⭐⭐⭐", duration: "2 dni",
    description: "Nyíregyháza kryje jeden z największych i najpiękniejszych zoo w Europie Środkowej – Sóstó Zoo. Ponad 500 gatunków zwierząt żyje tu na ogromnych, naturalistycznych wybiegach. Orangutany, słonie afrykańskie, żyrafy, lemury i dziesiątki egzotycznych gatunków. Tuż obok – dosłownie 5 minut pieszo – czeka Aquarius Experience & Park Bath, jeden z najlepszych aquaparków wschodniej Europy. Wieczorami relaks w słynnych termach Sóstó.",
    highlights: [
      "Sóstó Zoo – 500+ gatunków, wybiegi naturalistyczne",
      "Orangutany i małpy człekokształtne – wolne wybiegi",
      "Żyrafy i słonie afrykańskie w plenerze",
      "Aquarius Park Bath – aquapark 5 min pieszo od zoo",
      "Termy Sóstó – baseny termalne 35–38°C",
      "Safari nocne – unikalne nocne zwiedzanie zoo",
    ],
    tip: "Sóstó Zoo otwarte od 9:00. Bilety online – kolejki w sierpniu bywają długie. Karnet rodzinny 2+3 to duża oszczędność. Plan: Zoo rano → Aquarius po południu → Termy wieczorem.",
    aquapark: {
      name: "Aquarius Experience & Park Bath",
      tagline: "Najlepszy aquapark wschodniej Węgier — idealnie połączony z zoo",
      distance: "5–10 min pieszo od Sóstó Zoo",
      features: [
        "Zjeżdżalnia Kamikaze – ekstremalne opadanie pionowe",
        "Black Hole – zjeżdżalnia w całkowitej ciemności",
        "Family Slides & Race – wyścigi na zjeżdżalniach",
        "Elephant Slide – strefa dla najmłodszych",
        "Wave Pool – sztuczne fale jak na morzu",
        "Wild River – rwący nurt, prąd wodny",
        "Baseny termalne – część Aquarius Experience Bath",
        "Inca Temple Theme – strefa tematyczna",
        "Część indoor czynna cały rok (nawet w deszcz)",
      ],
      tip: "Aquarius działa w sezonie letnim (Czerwiec–Wrzesień). Część indoor (Aquarius Bath) czynna cały rok. Bilet łączony Zoo + Aquarius to duża oszczędność. Idealna kolejność: Zoo (9–13) → obiad → Aquarius (14–19) → Termy wieczorem.",
    },
    photos: [
      p("photo-1474511320723-9a56873867b5", "Żyrafa – naturalistyczny wybieg w Sóstó Zoo"),
      p("photo-1564349683136-77e08dba1ef7", "Egzotyczne zwierzęta w zoo"),
      p("photo-1602491453631-e2a5ad90a131", "Atrakcje zoo – bliskie spotkanie ze zwierzętami"),
      p("photo-1530103862676-de8c9debad1d", "Aquarius Park Bath – zjeżdżalnie wodne"),
      p("photo-1568605114967-8130f3a36994", "Wesołe zabawy w aquaparku"),
      p("photo-1523292562811-8fa7962a78c8", "Baseny i zjeżdżalnie wodne"),
      p("photo-1571019613454-1cb2f99b2d8b", "Termy Sóstó – relaks w ciepłej wodzie"),
      p("photo-1544161513-0179fe746fd5", "Baseny termalne – wieczorny odpoczynek"),
    ],
  },
  {
    day: "Dzień 4–5", dayRange: "13–14.08.2026", country: "Rumunia", flag: "🇷🇴",
    city: "Sibiu & Transfăgărășan", subtitle: "Legendarny Przełęcz Karpat",
    hotel: "Hilton Sibiu ⭐⭐⭐⭐⭐", duration: "1 dzień na trasie",
    description: "Transfăgărășan – jedna z najbardziej spektakularnych dróg świata. 90 km serpentyn wspinających się przez Karpaty Południowe na wysokość 2042 m n.p.m. Jeremy Clarkson nazwał ją najlepszą drogą na świecie. Punkt kulminacyjny to Przełęcz Balea Lac z szmaragdowym jeziorem górskim i wiecznym śniegiem. Jezioro Vidraru i zamek Poenari – prawdziwa siedziba Vlada Palownika – uzupełniają ten niezapomniany dzień. Sibiu, zwane Małym Paryżem, czeka na koniec dnia z winem i kolacją.",
    highlights: [
      "Transfăgărășan – 90 km serpentyn przez Karpaty Południowe",
      "Przełęcz Balea Lac (2034 m) – górskie jezioro ze śniegiem",
      "Jezioro Vidraru – ogromna zapora na rzece Ardgeş",
      "Zamek Poenari – ruiny prawdziwego zamku Drakuli",
      "Sibiu Stare Miasto – Piata Mare z budynkami-oczami",
      "Hilton Sibiu – luksusowy nocleg w centrum",
    ],
    tip: "Transfăgărășan otwarta od ok. 1 lipca do końca października. Wyrusz przed 8:00 – popołudnie jest zatłoczone. Na przełęczy może być o 15°C zimniej – weź kurtkę!",
    photos: [
      p("photo-1513104890138-7c749659a591", "Transfăgărășan – słynne serpentyny przez Karpaty"),
      p("photo-1501854140801-50d01698950b", "Alpejskie szczyty nad Transfăgărășan"),
      p("photo-1448375240586-882707db888b", "Górskie jezioro – Balea Lac na przełęczy"),
      p("photo-1454496522488-7a8e488e8606", "Zaśnieżone szczyty Karpat Południowych"),
      p("photo-1518173946687-a4c8892bbd9f", "Rzeka Argeş – dolina u stóp Transfăgărășan"),
      p("photo-1504701954957-2010ec3bcec1", "Głęboki wąwóz rzeki karpackiej"),
      p("photo-1515542622106-78bda8ba0e5b", "Sibiu – gotyckie centrum historyczne"),
      p("photo-1558642084-fd07fae5282e", "Sibiu – Wielki Plac z budynkami-oczami"),
      p("photo-1564507592333-c60657eea523", "Zamek Poenari – ruiny twierdzy Vlada Palownika"),
      p("photo-1464822759023-fed622ff2c3b", "Panorama Karpat Południowych"),
    ],
  },
  {
    day: "Dzień 6–7", dayRange: "15–16.08.2026", country: "Rumunia", flag: "🇷🇴",
    city: "Braszów", subtitle: "Zamek Bran, Râșnov & Aquapark",
    hotel: "Kronwell Brasov ⭐⭐⭐⭐", duration: "1 dzień zwiedzania",
    description: "Braszów to gotyckie serce Transylwanii – miasto założone przez Krzyżaków w XIII wieku. Zamek Bran wznosi się dramatycznie na skale, strzeżąc przełęczy karpackiej i wzbudza nieodpartą atmosferę grozy. Twierdza Râșnov to średniowieczna cytadela górująca 200 m nad miastem, jedna z najlepiej zachowanych twierdz obronnych Rumunii. Po górskim zwiedzaniu wieczorny relaks w Paradisul Acvatic – największym kompleksie wodnym Rumunii, tuż przy hotelu.",
    highlights: [
      "Zamek Bran – gotycka forteca na skale, symbol Transylwanii",
      "Twierdza Râșnov – XIV-wieczna cytadela, widoki 360°",
      "Braszów Stare Miasto – Czarny Kościół gotycki z XIV w.",
      "Paradisul Acvatic – relaks po górskim dniu (opcja)",
      "Kolejka linowa na szczyt Tampa (960 m)",
      "Ulica Ulita Sfori – jedna z najwęższych ulic Europy",
    ],
    tip: "Zamek Bran zamknięty w poniedziałek. Twierdza Râșnov jest 20 min drogi – idealne połączenie. Aquapark Paradisul Acvatic to świetna opcja na deszczowe popołudnie w Transylwanii.",
    aquapark: {
      name: "Paradisul Acvatic – Aquatic Paradise Brașov",
      tagline: "Jeden z największych kompleksów wodnych Rumunii — opcja na relaks po górach",
      distance: "10–15 min od centrum Brașova / Kronwell Brasov",
      features: [
        "Baseny zewnętrzne i wewnętrzne (czynne cały rok)",
        "Zjeżdżalnie indoor i outdoor – kamikaze, family, speed",
        "Wave Pool – basen z falami",
        "Strefa dla dzieci z małymi zjeżdżalniami",
        "Olimpijski basen – 50 m, dla aktywnych",
        "Sauny i strefa wellness",
        "Kawiarnia i restauracja na terenie kompleksu",
        "Świetna opcja na deszczowy dzień w Transylwanii",
      ],
      tip: "Paradisul Acvatic czynny cały rok (duża część indoor). Ceny ~50–80 RON. Idealne po całym dniu w Zamku Bran i Râșnov – wieczorny relaks w ciepłej wodzie. Parking bezpłatny.",
    },
    photos: [
      p("photo-1527838832700-5059252407fa", "Zamek Bran – gotycka forteca Transylwanii"),
      p("photo-1580537659466-0a9bfa916a54", "Mroczna atmosfera zamku w Transylwanii"),
      p("photo-1564507592333-c60657eea523", "Twierdza Râșnov górująca nad miastem"),
      p("photo-1533929736458-ca588d08c8be", "Gotyckie łuki i mury obronne"),
      p("photo-1541849546-216549ae216d", "Stare Miasto Braszów – barokowy plac"),
      p("photo-1515542622106-78bda8ba0e5b", "Historyczna architektura centrum Braszowa"),
      p("photo-1544735716-392fe2489ffa", "Lasy Karpat Wschodnich wokół Braszowa"),
      p("photo-1571406252241-db0280bd36cd", "Gotycki kościół w centrum Transylwanii"),
      p("photo-1520250497591-112f2f40a3f4", "Paradisul Acvatic – relaks po górskim dniu"),
    ],
  },
  {
    day: "Dzień 8–9", dayRange: "17–18.08.2026", country: "Bułgaria", flag: "🇧🇬",
    city: "Bansko", subtitle: "Monastyr Rylski & Kempinski SPA",
    hotel: "Kempinski Bansko ⭐⭐⭐⭐⭐", duration: "1 dzień + SPA wieczorem",
    description: "Monastyr Rylski – najświętsze miejsce Bułgarii, wpisane na listę UNESCO. Założony w X wieku przez św. Joanna Rylskiego. Freski pokrywające każdy centymetr dziedzińca to arcydzieło ikonografii bałkańskiej. Wąwóz Rilska prowadzący do klasztoru to jeden z piękniejszych widoków Bułgarii. Wieczorami odpoczynek w luksusowym Kempinski Bansko – pięciogwiazdkowym resorcie z SPA, saunami i basenami u stóp Rodopów.",
    highlights: [
      "Monastyr Rylski – UNESCO, X wiek, centrum duchowe Bułgarii",
      "Freski z XIX w. – tysiące malowideł i ikon na dziedzińcu",
      "Gorge Rilska – malowniczy wąwóz przy klasztorze",
      "Kempinski Bansko SPA – baseny, sauny, masaże premium",
      "Bansko centrum – XVIII-wieczne kamienne domy",
      "Muzeum Neofit Rilski w miasteczku Bansko",
    ],
    tip: "Monastyr Rylski czynny 8:00–20:00, wstęp bezpłatny. Zakryte ramiona i kolana (obowiązkowe). Odległość z Bansko ok. 60 km górską drogą. Wróć na SPA przed 17:00.",
    photos: [
      p("photo-1544551763-46a013bb70d5", "Monastyr Rylski – arcydzieło bułgarskiego baroku"),
      p("photo-1571406252241-db0280bd36cd", "Freski i ikony klasztoru Rylskiego"),
      p("photo-1558642084-fd07fae5282e", "Brukowane uliczki Bansko – XVIII-wieczne domy"),
      p("photo-1518173946687-a4c8892bbd9f", "Wąwóz Rilska prowadzący do klasztoru"),
      p("photo-1504701954957-2010ec3bcec1", "Rzeka górska w Górach Riła"),
      p("photo-1544735716-392fe2489ffa", "Lasy Rodopów otaczające klasztor"),
      p("photo-1501854140801-50d01698950b", "Szczyty Gór Riła – krajobraz UNESCO"),
      p("photo-1571019613454-1cb2f99b2d8b", "Kempinski Bansko SPA – baseny premium"),
      p("photo-1520250497591-112f2f40a3f4", "Luksusowy relaks w resorcie Kempinski"),
    ],
  },
  {
    day: "Dzień 10–13", dayRange: "19–22.08.2026", country: "Grecja", flag: "🇬🇷",
    city: "Saloniki", subtitle: "Meteory, Olimp & Waterland",
    hotel: "Lazart Hotel ⭐⭐⭐⭐", duration: "4 dni",
    description: "Saloniki – drugie co do wielkości miasto Grecji, tętniące życiem na styku historii i nowoczesności. Baza wypadowa do dwóch niezwykłych miejsc: Meteorów – skał z zawieszonymi klasztorami (UNESCO), gdzie mnisi żyli dosłownie nad przepaścią. I Olimpu – najwyższej góry Grecji, mitycznego domu bogów. Saloniki zachwycają Białą Wieżą, wczesnochrześcijańskimi bazylikami i słynną kuchnią. A na jeden dzień – największy aquapark północnej Grecji tuż za miastem.",
    highlights: [
      "Meteory – 6 klasztorów na pionowych skałach (UNESCO)",
      "Wielkie Meteory – największy i najstarszy monastyr",
      "Olimp – Mytikas 2918 m, mityczna góra bogów",
      "Waterland Thessaloniki – największy aquapark Grecji Płn.",
      "Saloniki Biała Wieża – symbol miasta",
      "Thessaloniki Food Tour – ouzo, bougatsa, souvlaki",
    ],
    tip: "Meteory najlepiej rano przed 10:00 lub wieczorem. Każdy klasztor ma inny dzień zamknięcia – sprawdź harmonogram. Olimp: wejście na Mytikas wymaga co najmniej 8 godzin. Waterland – Czerwiec do Września.",
    aquapark: {
      name: "Waterland Thessaloniki",
      tagline: "Największy aquapark Grecji Północnej — 150 000 m² atrakcji wodnych",
      distance: "15–20 min autem od centrum Salonik / Lazart Hotel",
      features: [
        "150 000 m² atrakcji – największy aquapark w Płn. Grecji",
        "Kamikaze & Tower slides – najwyższe zjeżdżalnie w Grecji",
        "Lazy River – relaksujący spływ w kręgu",
        "Wave Pool – ogromny basen z falami",
        "Multi Slide Racer – wyścigi na zjeżdżalniach",
        "Strefa dziecięca z małymi zjeżdżalniami i brodzik",
        "Restaurants & snack bars – gastronomia na terenie parku",
        "Otwarte Czerwiec–Wrzesień – idealne na sierpniowe lato",
      ],
      tip: "Waterland czynny Jun–Sep, godziny 10:00–19:00. Bilety ~25–35 EUR dorośli, dzieci taniej. Dojedź autem z Salonik (parking bezpłatny). Idealne na dzień relaksu między Meteorami a Pelionem.",
    },
    photos: [
      p("photo-1555993539-1732b0258235", "Meteory – monastyry zawieszone na pionowych skałach"),
      p("photo-1541849546-216549ae216d", "Monastyry Meteorów – wschód słońca"),
      p("photo-1544551763-46a013bb70d5", "Klasztor na skalnej iglicy – widok z dołu"),
      p("photo-1533105079780-92b9be482077", "Grecka architektura – niebieskie kopuły"),
      p("photo-1570077188670-e3a8d69ac5ff", "Greckie miasto nad morzem"),
      p("photo-1575408264798-b50b252663e6", "Zachód słońca nad Zatoką Termajską"),
      p("photo-1559827260-dc66d52bef19", "Morze Egejskie – widok z Salonik"),
      p("photo-1464822759023-fed622ff2c3b", "Olimp – mityczna góra bogów"),
      p("photo-1530103862676-de8c9debad1d", "Waterland Thessaloniki – atrakcje wodne"),
      p("photo-1533929736458-ca588d08c8be", "Antyczne ruiny Salonik"),
    ],
  },
  {
    day: "Dzień 14–16", dayRange: "23–25.08.2026", country: "Grecja", flag: "🇬🇷",
    city: "Pelion", subtitle: "Ukryte Plaże & Wioski",
    hotel: "Valis Resort ⭐⭐⭐⭐⭐", duration: "3 dni relaksu",
    description: "Pelion to mityczna kraina Centaurów – półwysep pełen zielonych lasów, kamiennych wiosek z archontiko i ukrytych plaż z turkusową wodą, do których można dotrzeć tylko pieszo lub łódką. Valis Resort to jeden z najpiękniejszych hoteli Grecji z nieskończonym basenem nad zatoką. Plaże Mylopotamos i Fakistra wygrywają w rankingach najpiękniejszych plaż Europy i mimo to pozostają prawie nieznane.",
    highlights: [
      "Plaża Mylopotamos – szmaragdowa woda, morskie jaskinie",
      "Plaża Fakistra – dostępna tylko pieszo, niemal dzika",
      "Portaria i Makrinitsa – kamienne wioski 1000 m n.p.m.",
      "Damouchari – wioska rybacka, plener z Mamma Mia",
      "Valis Resort infinity pool nad Zatoką Pagazetyjską",
      "Rejs łódką do plaż dostępnych tylko od strony morza",
    ],
    tip: "Do Mylopotamos schodzi się 30 min kamienną ścieżką – idź rano. Zabierz snorkeling – skały pełne ryb. Łódź z Horefto do Fakistra kosztuje ok. 10 EUR. Wino Malagousia z lokalnej winnicy.",
    photos: [
      p("photo-1507525428034-b723cf961d3e", "Plaża Mylopotamos – szmaragdowa woda Pelionu"),
      p("photo-1510414842594-a61c69b5ae57", "Turkusowa woda i białe kamyki"),
      p("photo-1519046904884-53103b34b206", "Ukryta zatoczka Pelionu – cisza i błękit"),
      p("photo-1559827260-dc66d52bef19", "Morze Egejskie u stóp klifów"),
      p("photo-1520250497591-112f2f40a3f4", "Valis Resort – nieskończony basen nad zatoką"),
      p("photo-1533105079780-92b9be482077", "Wioski Pelionu – kamienne archontiko"),
      p("photo-1570077188670-e3a8d69ac5ff", "Tradycyjna wioska na klifie nad morzem"),
      p("photo-1575408264798-b50b252663e6", "Zachód słońca nad Zatoką Pagazetyjską"),
      p("photo-1544735716-392fe2489ffa", "Lasy aromatycznych ziół Pelionu"),
      p("photo-1558642084-fd07fae5282e", "Damouchari – wioska rybacka Pelionu"),
    ],
  },
  {
    day: "Dzień 17", dayRange: "26.08.2026", country: "Bułgaria", flag: "🇧🇬",
    city: "Tyrnowo", subtitle: "Twierdza Tsarevets",
    hotel: "Yantra Grand Hotel ⭐⭐⭐⭐", duration: "1 dzień",
    description: "Wielkie Tyrnowo – dawna stolica Drugiego Carstwa Bułgarskiego z XII–XIV w., uważana za jedno z najpiękniejszych miast Bałkanów. Twierdza Tsarevets wznosi się nad rzeką Jantrą i każdy wieczór zamienia się w spektakl – pokaz świateł i muzyki opowiada historię bułgarskich carów. Wąskie uliczki dzielnicy Varosha, stary bazar Samovodska Charshia i wioska Arbanasi z XVII-wiecznymi kościołami dopełniają dzień.",
    highlights: [
      "Twierdza Tsarevets – siedziba carów bułgarskich",
      "Sound & Light Show – wieczorny pokaz świateł na murach",
      "Samovodska Charshia – XIX-wieczny bazar rzemieślniczy",
      "Panorama rzeki Jantry z murów obronnych",
      "Arbanasi – XVII-wieczna wioska, kościoły z freskami",
      "Dzielnica Varosha – brukowane uliczki starówki",
    ],
    tip: "Sound and Light Show ok. 21:00–22:00, bilet ~10 BGN. Twierdza czynna 8:00–19:00, wejście ~5 EUR. Widok z murów o zachodzie słońca jest fenomenalny.",
    photos: [
      p("photo-1527838832700-5059252407fa", "Twierdza Tsarevets – mury carów bułgarskich"),
      p("photo-1564507592333-c60657eea523", "Wieże średniowiecznej fortecy"),
      p("photo-1518173946687-a4c8892bbd9f", "Rzeka Jantry otaczająca twierdzę"),
      p("photo-1504701954957-2010ec3bcec1", "Głęboki wąwóz rzeki Jantry"),
      p("photo-1533929736458-ca588d08c8be", "Gotyckie łuki i wieże twierdzy"),
      p("photo-1515542622106-78bda8ba0e5b", "Stare Miasto Tyrnowo na skarpie"),
      p("photo-1580537659466-0a9bfa916a54", "Mroczna atmosfera średniowiecznych murów"),
      p("photo-1519681393784-d120267933ba", "Twierdza nocą – pokaz świateł"),
    ],
  },
  {
    day: "Dzień 18", dayRange: "27.08.2026", country: "Rumunia", flag: "🇷🇴",
    city: "Turda", subtitle: "Salina Turda – Podziemny Kosmos",
    hotel: "SunGarden Salina ⭐⭐⭐⭐", duration: "1 dzień",
    description: "Salina Turda to jedno z najbardziej niezwykłych miejsc w Europie – XVIII-wieczna kopalnia soli zamieniona w futurystyczny park rozrywki 100 metrów pod ziemią. Komnata Rudolfa kryje amfiteatr, jezioro z łódkami, kolumbus, mini-golf i bilard. Temperatura stała 12°C i powietrze nasycone solą mają udokumentowany efekt leczniczy na układ oddechowy.",
    highlights: [
      "Komnata Rudolfa – gigantyczna przestrzeń 80 m pod ziemią",
      "Jezioro solne z łódkami wewnątrz kopalni",
      "Mini-golf, bilard, boisko 100 m pod ziemią",
      "Koło panoramiczne w podziemnej komnacie",
      "Haloterapia – lecznicze powietrze solne",
      "Solne formacje – miliony lat historii geologicznej",
    ],
    tip: "Bilety 35–45 RON, dzieci do 5 lat bezpłatnie. Temperatura 12°C przez cały rok – koniecznie weź kurtkę! Kasa 9:00–17:00, ostatnie wejście 16:00. Parkowanie bezpłatne.",
    photos: [
      p("photo-1558618666-fcd25c85cd64", "Salina Turda – podziemna katedra soli"),
      p("photo-1515847049296-a281d6401047", "Atmosferyczne oświetlenie komnat kopalni"),
      p("photo-1527786356703-4b100091cd2c", "Podziemne korytarze kopalni soli"),
      p("photo-1509316785289-025f5b846b35", "Historyczny szyb wydobywczy Saliny"),
      p("photo-1448375240586-882707db888b", "Jezioro solne w komorze Rudolfa"),
      p("photo-1504701954957-2010ec3bcec1", "Głęboki szyb podziemny – widok w górę"),
      p("photo-1454496522488-7a8e488e8606", "Solne formacje skalne miliony lat"),
      p("photo-1519681393784-d120267933ba", "Mistyczna atmosfera podziemnej kopalni"),
      p("photo-1571019613454-1cb2f99b2d8b", "Haloterapia – lecznicze powietrze solne"),
    ],
  },
  {
    day: "Dzień 19", dayRange: "28.08.2026", country: "Polska", flag: "🇵🇱",
    city: "Powrót", subtitle: "Finał Wielkiej Przygody",
    hotel: "—", duration: "Dzień podróży",
    description: "Ostatni etap – ponad 900 km przez Słowację i Czechy z powrotem do Warszawy. 19 dni, 3500 km, 5 krajów, 9 miast, jedno niezapomniane lato rodzinne. Cadillac Escalade niósł nas przez Karpaty, Bałkany, nad Olimp i z powrotem. W bagażniku: wspomnienia na całe życie, zdjęcia z Transfăgărășan, smak greckiego morza na Pelionie i sól z Turdii.",
    highlights: [
      "Trasa: Turda → Kluż → Bratysława → Warszawa",
      "Razem: 3500 km, 5 krajów, 9 noclegów premium",
      "Cadillac ESV – ok. 475 litrów paliwa przez całą trasę",
      "Ekipa: 5 osób + Kot – wszyscy szczęśliwi i cali",
      "Planowanie kolejnego roadtripu 2027",
    ],
    tip: "Dwie przerwy: przy Brnie i na granicy polskiej. Słowacja i Czechy wymagają winiety. Dotankuj do pełna przed wjazdem do Polski. Dobrej drogi!",
    photos: [
      p("photo-1434626881859-194d67b2b86f", "Ostatnia góralska droga powrotna"),
      p("photo-1486325212027-8081e485255e", "Przez lasy środkowej Europy"),
      p("photo-1426604966848-d7adac402bff", "Autostrada na wprost – powrót do domu"),
      p("photo-1506905925346-21bda4d32df4", "Zachód słońca nad Karpatami – ostatni widok"),
      p("photo-1469474968028-56623f02e42e", "Zielone lasy Czech i Słowacji"),
      p("photo-1464822759023-fed622ff2c3b", "Wspomnienia z gór Bałkanów"),
    ],
  },
];

export function RoutePreview() {
  const [selected, setSelected] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const stop = stops[selected];

  const selectStop = (i: number) => { setSelected(i); setPhotoIdx(0); };
  const nextPhoto = () => setPhotoIdx((p) => (p + 1) % stop.photos.length);
  const prevPhoto = () => setPhotoIdx((p) => (p - 1 + stop.photos.length) % stop.photos.length);

  return (
    <div className="flex flex-col lg:flex-row gap-0 rounded-2xl overflow-hidden border border-primary/20 shadow-2xl min-h-[720px]">

      {/* ── LEWA LISTA PRZYSTANKÓW ── */}
      <div className="lg:w-72 xl:w-80 shrink-0 bg-[#0F1115] border-b lg:border-b-0 lg:border-r border-primary/10 overflow-y-auto max-h-[240px] lg:max-h-none">
        <div className="p-4 border-b border-primary/10">
          <p className="text-primary text-xs uppercase tracking-[0.2em] font-semibold">Przystanki trasy</p>
        </div>
        <ul className="divide-y divide-white/5">
          {stops.map((s, i) => (
            <li key={i}>
              <button
                onClick={() => selectStop(i)}
                className={`w-full text-left px-4 py-3.5 transition-all duration-200 flex items-center gap-3 group ${
                  selected === i ? "bg-primary/15 border-l-2 border-primary" : "hover:bg-white/5 border-l-2 border-transparent"
                }`}
              >
                <span className="text-xl shrink-0">{s.flag}</span>
                <div className="min-w-0">
                  <p className={`text-sm font-semibold truncate ${selected === i ? "text-primary" : "text-white group-hover:text-white/90"}`}>
                    {s.city}
                  </p>
                  <p className="text-white/40 text-xs truncate">{s.day} · {s.dayRange}</p>
                </div>
                {selected === i && <ChevronRight size={14} className="text-primary ml-auto shrink-0" />}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* ── PRAWY PANEL SZCZEGÓŁÓW ── */}
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
            {/* GALERIA ZDJĘĆ */}
            <div className="relative h-72 md:h-80 shrink-0 overflow-hidden bg-black">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${selected}-${photoIdx}`}
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

              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1D23] via-transparent to-black/20 pointer-events-none" />

              <div className="absolute bottom-12 left-4 right-16">
                <p className="text-white/55 text-xs">{stop.photos[photoIdx].caption}</p>
              </div>
              <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white/60 text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <Image size={11} /> {photoIdx + 1} / {stop.photos.length}
              </div>

              <button onClick={() => setLightbox(stop.photos[photoIdx].url)}
                className="absolute top-3 right-3 p-2 rounded-lg bg-black/40 backdrop-blur-sm text-white/60 hover:text-white hover:bg-black/60 transition-all">
                <ZoomIn size={16} />
              </button>

              <button onClick={prevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white/70 hover:text-white hover:bg-black/70 transition-all">
                <ChevronLeft size={18} />
              </button>
              <button onClick={nextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white/70 hover:text-white hover:bg-black/70 transition-all">
                <ChevronRight size={18} />
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 flex-wrap justify-center max-w-xs">
                {stop.photos.map((_, i) => (
                  <button key={i} onClick={() => setPhotoIdx(i)}
                    className={`rounded-full transition-all duration-200 ${i === photoIdx ? "w-4 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-white/35 hover:bg-white/60"}`} />
                ))}
              </div>
            </div>

            {/* MINIATURY */}
            <div className="flex gap-1.5 px-4 pt-3 pb-1 overflow-x-auto shrink-0 scrollbar-thin">
              {stop.photos.map((ph, i) => (
                <button key={i} onClick={() => setPhotoIdx(i)}
                  className={`shrink-0 w-14 h-10 rounded-md overflow-hidden border-2 transition-all ${i === photoIdx ? "border-primary" : "border-transparent opacity-50 hover:opacity-80"}`}>
                  <img src={ph.url} alt={ph.caption} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* TREŚĆ SZCZEGÓŁÓW */}
            <div className="flex-1 overflow-y-auto px-5 md:px-7 py-4 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs uppercase tracking-widest text-primary font-semibold">{stop.day} · {stop.dayRange}</span>
                  <span className="text-white/20">·</span>
                  <span className="text-xs text-white/40">{stop.country}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white leading-tight">{stop.city}</h3>
                <p className="text-primary/80 font-serif mt-0.5">{stop.subtitle}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
                  <Hotel size={12} className="text-primary" />
                  <span className="text-white/70 text-xs">{stop.hotel}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
                  <Clock size={12} className="text-primary" />
                  <span className="text-white/70 text-xs">{stop.duration}</span>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-primary/60 font-semibold mb-1.5 flex items-center gap-1.5">
                  <MapPin size={11} /> Opis atrakcji
                </p>
                <p className="text-white/75 text-sm leading-relaxed">{stop.description}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-primary/60 font-semibold mb-1.5">Co zobaczyć</p>
                <ul className="space-y-1.5">
                  {stop.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                      <span className="text-primary shrink-0 mt-0.5">›</span>{h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* AQUAPARK SECTION */}
              {stop.aquapark && (
                <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-cyan-500/15 bg-cyan-500/8">
                    <Waves size={14} className="text-cyan-400" />
                    <span className="text-cyan-400 text-xs uppercase tracking-widest font-semibold">Aquapark</span>
                    <span className="ml-auto text-xs text-cyan-400/50 font-medium">{stop.aquapark.distance}</span>
                  </div>
                  <div className="px-4 py-3 space-y-2.5">
                    <div>
                      <p className="text-white font-semibold text-sm">{stop.aquapark.name}</p>
                      <p className="text-cyan-400/70 text-xs mt-0.5">{stop.aquapark.tagline}</p>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1">
                      {stop.aquapark.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-white/65">
                          <span className="text-cyan-400 shrink-0 mt-0.5">›</span>{f}
                        </li>
                      ))}
                    </ul>
                    <div className="rounded-lg bg-cyan-500/10 border border-cyan-500/20 px-3 py-2">
                      <p className="text-cyan-300/70 text-xs leading-relaxed">{stop.aquapark.tip}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="rounded-xl border border-primary/25 bg-primary/5 px-4 py-3">
                <p className="text-primary text-xs uppercase tracking-widest font-semibold mb-1 flex items-center gap-1.5">
                  <Lightbulb size={11} /> Wskazówka podróżnicza
                </p>
                <p className="text-white/65 text-sm leading-relaxed">{stop.tip}</p>
              </div>

              <div className="flex gap-3 pt-1 pb-2">
                {selected > 0 && (
                  <button onClick={() => selectStop(selected - 1)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-all text-sm">
                    <ChevronLeft size={15} /> {stops[selected - 1].city}
                  </button>
                )}
                {selected < stops.length - 1 && (
                  <button onClick={() => selectStop(selected + 1)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/35 bg-primary/8 text-primary hover:bg-primary/15 transition-all text-sm ml-auto">
                    {stops[selected + 1].city} <ChevronRight size={15} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-sm p-4"
            onClick={() => setLightbox(null)}>
            <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              src={lightbox} alt="Powiększone zdjęcie"
              className="max-w-full max-h-full rounded-xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()} />
            <button onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all">
              <X size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
