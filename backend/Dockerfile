# ----------- Build Stage -----------
FROM node:20 AS builder

WORKDIR /app

# Copy and install all dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Pass build arg and set env so NEXT_PUBLIC_API_URL is available during build
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Build TypeScript to dist/
RUN npm run build

# ----------- Production Stage -----------
FROM node:20-slim AS runner

WORKDIR /app

# Only install production dependencies
COPY package*.json ./
RUN npm install --omit=dev --no-audit

# Copy compiled output and env files
COPY --from=builder /app/dist ./dist

# Set environment
ENV NODE_ENV=production

# Expose backend port (match your code)
EXPOSE 3000

# Run the production server
CMD ["node", "dist/index.js"]