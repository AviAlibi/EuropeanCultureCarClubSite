FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ENV NODE_ENV=production

RUN npm run db:generate
RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/infra/prisma ./infra/prisma
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/prisma.config.ts ./

RUN npm install prisma --omit=dev

RUN addgroup -g 1001 -S nodejs && adduser -S user -u 1001

USER user

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node server.js"]
