# ---------------- Base Deps Stage ----------------
FROM node:20-alpine AS deps

WORKDIR /app
RUN apk add --no-cache libc6-compat bash curl
COPY . .

# Install Turbo and pnpm globally
RUN npm install -g turbo pnpm

# Prune to only the frontend and dependencies
RUN turbo prune frontend --docker

# ---------------- Installer Stage ----------------
FROM node:20-alpine AS installer

WORKDIR /app

# Copy pruned package.json files
COPY --from=deps /app/out/json/ .

# Copy lockfile
COPY pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Copy source code
COPY --from=deps /app/out/full/ .

# Set environment variables
ARG NEXT_PUBLIC_API_URL=https://daningatlanapi.duckdns.org/api/v1
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PRIVATE_STANDALONE=true
RUN pnpm turbo run build --filter=frontend \
  && chown -R 1001:1001 /app/apps/frontend/.next

# ---------------- Production Stage ----------------
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
# Create non-root user
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
USER nextjs

# Copy standalone app
COPY --from=installer /app/apps/frontend/.next/standalone ./
COPY --from=installer /app/apps/frontend/.next/static ./apps/frontend/.next/static
COPY --from=installer /app/apps/frontend/public ./apps/frontend/public

# Add optional env if needed (can also be passed at runtime)
ENV PORT=3001
ENV HOSTNAME=0.0.0.0
EXPOSE 3001
CMD ["node", "apps/frontend/server.js"]