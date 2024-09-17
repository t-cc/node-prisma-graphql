FROM node:20-alpine AS base

WORKDIR ./app


# ARG NODE_ENV
# NV NODE_ENV=$NODE_ENV

# COPY .env.${NODE_ENV} ./.env
COPY .env.prod ./.env
COPY .swcrc ./.swcrc

COPY package.json ./package.json
COPY pnpm-lock.yaml ./pnpm-lock.yaml

COPY prisma ./prisma
COPY .adminjs ./.adminjs
COPY src ./src
COPY tsconfig.json ./tsconfig.json

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm gen
RUN pnpm build

EXPOSE 3000

CMD exec pnpm start:prod
