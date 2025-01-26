FROM node:20-alpine AS builder

ARG DATABASE_URL
ARG GOOGLE_OAUTH_CLIENT_ID
ARG GOOGLE_OAUTH_CLIENT_SECRET
ARG GOOGLE_OAUTH_CALLBACK_URL
ARG STRIPE_SECRET_KEY
ARG STRIPE_WEBHOOK_SECRET
ARG STRIPE_INDIE_HACKER_PLAN_PRICE_ID
ARG DOMAIN

RUN mkdir /app

COPY . /app

WORKDIR /app
# csrf check is disabled for local development
RUN rm svelte.config.js
# csrf check is enabled for prod 
RUN mv svelte.config.prod.js svelte.config.js
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
