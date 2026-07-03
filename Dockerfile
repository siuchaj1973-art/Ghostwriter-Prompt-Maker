# syntax=docker/dockerfile:1

# ──────────────────────────────────────────────────────────────────────────
# Pętla Bałkańska 2026 — kontener produkcyjny.
# Build statycznej aplikacji React/Vite (@workspace/balkanska-2026)
# w monorepo pnpm, serwowany przez nginx (z fallbackiem SPA).
# ──────────────────────────────────────────────────────────────────────────

# ── Etap 1: build ─────────────────────────────────────────────────────────
FROM node:22-bookworm-slim AS builder

# BASE_PATH steruje ścieżką bazową zasobów (np. "/" dla roota domeny,
# "/podkatalog/" jeśli aplikacja stoi pod ścieżką). PORT jest wymagany przez
# vite.config.ts także na etapie builda, choć w kontenerze runtime serwuje nginx.
ARG BASE_PATH=/
ENV PORT=3000 \
    BASE_PATH=${BASE_PATH} \
    NODE_ENV=production \
    CI=true

WORKDIR /app

# pnpm w wersji zgodnej z lockfile
RUN npm install -g pnpm@10

# Najpierw manifesty + lockfile — lepsze cache warstwy zależności.
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json .npmrc tsconfig.base.json tsconfig.json ./

# Reszta źródeł monorepo.
COPY lib ./lib
COPY artifacts ./artifacts
COPY scripts ./scripts
COPY attached_assets ./attached_assets

# Instalacja wg zamrożonego lockfile (z devDependencies — potrzebne do builda).
RUN pnpm install --frozen-lockfile

# Build tylko aplikacji Pętli Bałkańskiej → artifacts/balkanska-2026/dist/public
RUN pnpm --filter @workspace/balkanska-2026 run build

# ── Etap 2: runtime ───────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS runtime

# Konfiguracja nginx z fallbackiem SPA i cache dla assetów.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Zbudowane pliki statyczne.
COPY --from=builder /app/artifacts/balkanska-2026/dist/public /usr/share/nginx/html

# Prosty healthcheck — serwer odpowiada na stronie głównej.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
