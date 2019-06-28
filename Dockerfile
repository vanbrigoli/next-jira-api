FROM node:9.4-alpine

WORKDIR /app

COPY package*.json ./

RUN apk update && apk upgrade \
	&& apk add --no-cache git \
	&& apk --no-cache add --virtual builds-deps build-base python \
	&& npm install -g nodemon cross-env eslint npm-run-all node-gyp node-pre-gyp && npm install\
	&& npm rebuild bcrypt --build-from-source

COPY . .

RUN npm install --production

EXPOSE 3000

CMD ["npm", "start"]