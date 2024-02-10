FROM node:latest
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "dist/app.js"]  # Ensure TypeScript is compiled to JS
