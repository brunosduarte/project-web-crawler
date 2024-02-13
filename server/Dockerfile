FROM node:latest
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5431
EXPOSE 5672
EXPOSE 15672
CMD ["node", "dist/src/main.js"]
