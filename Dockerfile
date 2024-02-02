FROM node:alpine
COPY . /app
WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
 
RUN npm install

CMD node app.js