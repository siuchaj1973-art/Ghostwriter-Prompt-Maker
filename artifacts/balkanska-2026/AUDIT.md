# Pętla Bałkańska 2026 — Audyt i nowe rozwiązanie

## 1. Audyt obecnego systemu (stan przed zmianami)

Aplikacja to jednostronicowy serwis React + Tailwind (`artifacts/balkanska-2026`)
z sekcjami: Navbar, Hero, Dashboard, Tabela/Podgląd trasy, Doświadczenia, PDF.

Zidentyfikowane braki:

| # | Problem | Skutek |
|---|---------|--------|
| 1 | **Zdjęcia nie przedstawiały atrakcji.** `route-preview.tsx` i `experiences.tsx` używały losowych zdjęć stockowych z Unsplash (przypadkowe góry, lasy, plaże). Podpis mówił „Zamek Bran”, a obraz pokazywał anonimową górę. | Brak wiarygodności — wbrew wymaganiu „rzeczywiste zdjęcia atrakcji”. |
| 2 | **Brak wyszukiwania i podglądu atrakcji w locie.** Wszystko zaszyte na sztywno, bez filtrów ani wyszukiwarki. | Nie dało się szybko znaleźć ani porównać atrakcji. |
| 3 | **Trasa nie do modyfikacji.** Kolejność i skład przystanków były statyczne. | Użytkownik nie mógł zmieniać planu. |
| 4 | **Hotele bez uzasadnienia.** Jedynie nazwy w tabeli — brak powiązania z pierwotnymi założeniami wyjazdu ani linków do rezerwacji. | Trudno ocenić trafność noclegów. |

## 2. Nowe, bardziej funkcjonalne rozwiązanie

### a) Prawdziwe zdjęcia atrakcji (Wikimedia Commons)
- Nowy helper `src/lib/media.ts` → `commons(file, caption)` buduje stabilne
  adresy `Special:FilePath`, które zawsze prowadzą do aktualnej wersji pliku.
- Każde zdjęcie to potwierdzona, realna fotografia konkretnego obiektu
  (Transfăgărășan, Zamek Bran, Meteory, Salina Turda, Tsarewec, Rila itd.).
- Zaktualizowano: `hero.tsx`, `route-preview.tsx`, `experiences.tsx`.

### b) Planer Trasy w Locie — `src/components/sections/planner.tsx`
Interaktywne narzędzie (sekcja `#planer`):
- **Wyszukiwarka** po nazwie, mieście, kraju i opisie + **filtry kategorii**.
- **Podgląd atrakcji** z galerią prawdziwych zdjęć, opisem, wskazówką i lightboxem.
- **Modyfikacja trasy w locie**: dodawanie/usuwanie atrakcji, zmiana kolejności
  (góra/dół), reset do planu pierwotnego, licznik przystanków i krajów.

### c) Hotele wg pierwotnych założeń — `src/components/sections/hotels.tsx`
Sekcja `#hotele`:
- Karty hoteli z gwiazdkami, poziomem cenowym i uzasadnieniem.
- **Znaczniki spełnianych założeń** (rodzina 5 os. + kot, premium 4–5★,
  parking dla Cadillaca ESV, atrakcje dla dzieci, bliskość, termin sierpień).
- Filtr po założeniu + linki do wyszukiwarki **Booking.com** i **Map Google**.
- Warianty: hotele z planu pierwotnego + dobrane **alternatywy**.

### d) Wspólny model danych — `src/data/trip.ts`
Jedno źródło prawdy: katalog atrakcji (kategorie, współrzędne, zdjęcia),
lista hoteli z tagami założeń, lista założeń pierwotnych i domyślna trasa.

## 3. Weryfikacja
- `pnpm run typecheck` — przechodzi.
- `PORT=3000 BASE_PATH=/ pnpm run build` — build produkcyjny przechodzi.
