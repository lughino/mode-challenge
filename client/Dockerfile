FROM node:16-alpine as node

FROM node as build

RUN apk add --no-cache libc6-compat

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /usr/src/monorepo

COPY package.json tsconfig.json yarn.lock webpack.base.js .eslintrc.js .eslintignore .eslintrc.overrides.js ./
COPY client ./client

RUN yarn install --frozen-lockfile --silent --prefer-offline
RUN cd client && yarn build

FROM node as client

WORKDIR /usr/src/app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=build /usr/src/monorepo/client/next.config.js /usr/src/app/
COPY --from=build /usr/src/monorepo/client/public /usr/src/app/public/
COPY --from=build --chown=nextjs:nodejs /usr/src/monorepo/client/.next /usr/src/app/.next/
COPY --from=build /usr/src/monorepo/client/node_modules/ /usr/src/app/node_modules/
COPY --from=build /usr/src/monorepo/node_modules/ /usr/src/app/node_modules/
COPY --from=build /usr/src/monorepo/client/package.json /usr/src/app/

USER nextjs
EXPOSE 4000

ENTRYPOINT ["yarn", "start"]
