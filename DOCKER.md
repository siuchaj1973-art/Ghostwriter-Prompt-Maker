# Docker — Pętla Bałkańska 2026

Konteneryzacja aplikacji frontendowej `@workspace/balkanska-2026` (React + Vite),
serwowanej jako statyka przez nginx. Build wieloetapowy: pnpm buduje aplikację,
a lekki obraz `nginx:alpine` serwuje gotowe pliki z fallbackiem SPA.

## Szybki start (docker compose)

```bash
docker compose up --build
```

Aplikacja: **http://localhost:8080**

## Bez compose

```bash
# build obrazu
docker build -t balkanska-2026 .

# uruchomienie (host 8080 → kontener 80)
docker run --rm -p 8080:80 balkanska-2026
```

## Serwowanie pod podścieżką

Domyślnie zasoby budują się dla roota (`BASE_PATH=/`). Aby postawić aplikację
pod ścieżką (np. `/trasa/`), przekaż `BASE_PATH` jako build-arg:

```bash
docker build --build-arg BASE_PATH=/trasa/ -t balkanska-2026 .
```

## Uwagi

- Obraz zawiera wyłącznie statyczny frontend. Zdjęcia atrakcji (Wikimedia
  Commons) i kafle mapy (OpenStreetMap) pobiera przeglądarka użytkownika w
  czasie działania — kontener nie potrzebuje do tego dostępu do sieci.
- `HEALTHCHECK` sprawdza, czy nginx odpowiada na stronie głównej.
- Build wymaga zmiennych `PORT` i `BASE_PATH` (wymusza je `vite.config.ts`);
  są ustawione w `Dockerfile` — w runtime i tak serwuje nginx.
