FROM node:12.22.1 as build-stage
WORKDIR /app
COPY package*.json ./

RUN yarn install
COPY ./ .
RUN yarn build

FROM nginx as production-stage
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
