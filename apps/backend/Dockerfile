FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat bash curl
WORKDIR /app
RUN npm install -g turbo pnpm

FROM base AS prune
COPY . .
RUN pnpm install --frozen-lockfile \
    && turbo prune backend --docker

FROM base AS installer
WORKDIR /app
COPY --from=prune /app/out/json/ ./
COPY pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy backend + shared source + built shared package
COPY --from=prune /app/out/full/ ./

# Build backend
RUN pnpm turbo run build --filter=backend

FROM node:20-slim AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 expressjs \
  && adduser --system --uid 1001 expressjs \
  && mkdir -p /app/apps/uploads /app/logs \
  && chown -R expressjs:expressjs /app/apps/uploads /app/logs
USER expressjs

COPY --from=installer /app .
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "apps/backend/dist/index.js"]