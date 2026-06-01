# --- BUILDER STAGE ---
FROM node:20-slim AS builder

WORKDIR /app

# Install openssl for Prisma engine compatibility
RUN apt-get update -y && apt-get install -y openssl

# Copy package manifests
COPY package*.json ./

# Install all dependencies for compiling TypeScript
RUN npm ci

# Copy Prisma schema and generate Client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy tsconfig and source files
COPY tsconfig.json ./
COPY src ./src

# Compile TypeScript to production ES Modules
RUN npm run build

# --- RUNNER STAGE ---
FROM node:20-slim

WORKDIR /app

# Install runtime openssl and cleanup package cache
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copy package manifests
COPY package*.json ./

# Install ONLY production dependencies to keep the image size minimal
RUN npm ci --only=production

# Copy compiled JavaScript, Prisma schema, and Prisma Client from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Expose default API server port
EXPOSE 5000

# Set environment context
ENV NODE_ENV=production

# Graceful startup execution
CMD ["node", "dist/server.js"]
