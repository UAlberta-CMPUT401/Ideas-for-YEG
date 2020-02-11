FROM strapi/base

WORKDIR /api

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY . .

EXPOSE 1337

ENV NODE_ENV production

CMD ["npm","run","strapi","dev"]