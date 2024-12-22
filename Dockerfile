FROM node:20-alpine AS builder

ARG DATABASE_URL
ARG GOOGLE_OAUTH_CLIENT_ID
ARG GOOGLE_OAUTH_CLIENT_SECRET
ARG GOOGLE_OAUTH_CALLBACK_URL
RUN mkdir /app

COPY . /app

WORKDIR /app
RUN npm install
RUN npm run build



FROM node:20-alpine

RUN mkdir /app

COPY --from=builder /app/build /app/build
COPY --from=builder /app/package.json /app/package-lock.json /app/
COPY --from=builder /app/prisma /app/prisma

WORKDIR /app
RUN npm install
RUN npm install @prisma/client
RUN npx prisma generate

CMD ["node", "build/index.js"]
