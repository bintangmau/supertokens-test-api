FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g @nestjs/cli
RUN npm install --production=true

COPY . .

RUN npm run build

EXPOSE 3001

CMD [ "node", "dist/main" ]
