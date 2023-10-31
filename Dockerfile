FROM node:16-alpine AS builder
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:16-alpine AS server
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --production
COPY --from=builder ./app/public ./public
COPY --from=builder ./app/build ./build

EXPOSE 9000
CMD ["yarn", "start"]
