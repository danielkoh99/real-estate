# Use an official Node.js runtime as the base image
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variables
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
# Build the Next.js application using the production environment
RUN npm run build

# Start a new, minimal image
FROM node:18-slim AS runner

# Set working directory
WORKDIR /app

# Copy only the build files from the builder stage
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
# Expose the port that Next.js runs on
EXPOSE 3000

# Start Next.js in production
CMD ["npm", "start"]