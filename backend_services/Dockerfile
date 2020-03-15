FROM node:12.13.0-alpine

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

# copy the app to the container, note the .dockerignore for ignoring files
COPY . .

EXPOSE 1311

ENV NODE_ENV production

CMD ["npm","run","start"]
