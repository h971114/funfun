FROM node:12

MAINTAINER Lucas Shin <h971114@lieklion.org>

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]