FROM node:12.22.1 as build-stage
WORKDIR /app
COPY package*.json ./
#RUN npm install -g yarn
RUN yarn install
#RUN npm install
COPY ./ .
#RUN npm run build
RUN yarn build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
