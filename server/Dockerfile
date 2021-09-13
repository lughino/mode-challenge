FROM node:16-alpine as node

FROM node as build

WORKDIR /usr/src/monorepo

COPY package.json tsconfig.json yarn.lock webpack.base.js ./
COPY server ./server

RUN yarn install --frozen-lockfile --silent --prefer-offline
RUN cd server && yarn build

FROM node as server

WORKDIR /usr/src/app

COPY --from=build /usr/src/monorepo/server/dist /usr/src/app/server/
COPY --from=build /usr/src/monorepo/node_modules/ /usr/src/app/node_modules/
COPY --from=build /usr/src/monorepo/server/node_modules/ /usr/src/app/node_modules/

ENTRYPOINT ["node", "server/main.js"]
