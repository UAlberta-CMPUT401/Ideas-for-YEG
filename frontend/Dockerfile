FROM node:12.13.0-alpine

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

# copy the app to the container, note the .dockerignore for ignoring files
COPY . .

RUN npm run build

EXPOSE 3000

ENV NODE_ENV production
ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 3000

CMD ["npm","run","start"]