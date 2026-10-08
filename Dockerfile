# syntax=docker/dockerfile:1

# ─── Сборка ──────────────────────────────────────────────────────────────
FROM node:24-alpine AS build
WORKDIR /app
ENV CI=true

# Сначала только манифесты — слой с зависимостями кешируется,
# пока package-lock.json не изменился
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# В контекст сборки не попадают .env.* (см. .dockerignore), поэтому здесь
# runtimeConfig собирается пустым, а значения NUXT_* подставляются в рантайме
RUN npm run build

# ─── Исполнение ──────────────────────────────────────────────────────────
FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production

# .output самодостаточный: нужные для запуска пакеты (nodemailer и пр.)
# уже воходят в .output/server
COPY --from=build /app/.output ./.output

# Отдаём статику и сервер от непривилегированного пользователя
USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/ > /dev/null 2>&1 || exit 1

# Порт/хост можно переопределить переменными PORT и HOST
CMD ["node", ".output/server/index.mjs"]
