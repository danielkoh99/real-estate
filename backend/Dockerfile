# ----------- Build Stage -----------
FROM node:18 AS builder

WORKDIR /app

# Copy and install all dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build TypeScript to dist/
RUN npm run build

# ----------- Production Stage -----------
FROM node:18-slim AS runner

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