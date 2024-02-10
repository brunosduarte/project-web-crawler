<h1 align="center">Project Web Crawler</h1>
<br />

## 🗂 Contents

- 📋 [Project](#-project)
  - 🚀 [Technologies](#-technologies)
  - 📷 [Preview](#-preview)
- 📦 [Instalation](#-instalation)
- ⚖️ [License](#%EF%B8%8F-license)
- 📫 [Contact](#-contact)


## 📋 Project

In this project was implemented a web crawler that dig into a domain and extract all internal links generating a sitemap with the content.
On the Frontend you insert the domain, this information is send to the server that crawl the website and generate a list of links.
The process to crawl the website is made by another application named workers that will pick up the list of founded links in the root page
and distribute the job with Docker in many threads to minimize the time to find the results.
For the communication between Workers and Server was used the concept of Pub/Sub using RabbitMQ.
When the Server gives back the result to the Frontend is generated a Tree view of the results.



### 🚀 Technologies

[![React.js](https://img.shields.io/badge/React.js-gray?logo=React)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-gray?logo=Node.js)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-gray?logo=TypeScript)](https://typescriptlang.org)
[![Axios](https://img.shields.io/badge/Axios-gray?logo=Axios)](https://axios-http.com)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-gray?logo=TailwindCSS)](https://tailwindcss.com)
[![Puppeteer](https://img.shields.io/badge/Puppeteer-gray?logo=Puppeteer)](https://pptr.dev)
[![NestJS](https://img.shields.io/badge/NestJS-gray?logo=NestJS)](https://nestjs.com)
[![Vite](https://img.shields.io/badge/Vite-gray?logo=Vite)](https://vitejs.dev)
[![D3.js](https://img.shields.io/badge/D3.js-gray?logo=D3.js)](https://d3js.org)


## 📷 Preview

##### 💻 frontend:

<p align="center"> 
  <img alt="SiteMapper" src="diagram.jpg" width="100%">
</p>

## 📦 Instalation

To clone and run this application, you will need [Git][git], [NodeJS v18.17.1][nodejs] or higher + [npm v9.17.1][npm] or higher, and [PNPm 8.7.5][pnpm] installed on your computer. In your terminal, run:


```bash
# Cloning repo
$ git clone https://github.com/sagelabs/bruno-duarte-interview.git site-mapper
```

```bash
# Server

# Go to the repository
$ cd server

# Install the dependencies
$ npm install

# Run the API
$ npm run dev

# Note: After running the command above, the API will be available at http://localhost:3000

```


```bash
# Workers

# Go to the repository
$ cd workers

# Install the dependencies
$ npm install

# Run the API
$ npm run dev

# Note: After running the command above, the API will be available at http://localhost:3001

```


```bash
# Frontend

# Got to the repository
$ cd web

# Install dependencies
$ npm install

# Execute
$ npm run dev
```


## ⚖️ License

This project is under license. [MIT](LICENSE).


## 📫 Contact

by [**Bruno S. Duarte**](https://www.linkedin.com/in/brunosduarte/) 🚀

[git]: https://git-scm.com
[nodejs]: https://nodejs.org/
[pnpm]: https://pnpm.io/pt/
[npm]: https://www.npmjs.com/
[expressjs]: https://expressjs.com
[git]: https://git-scm.com
