<h1 align="center">Project Web Crawler</h1>
<br />

## 🗂 Contents

- 📋 [Project](#-project)
  - 🚀 [Technologies](#-technologies)
  - 🧮 [Diagram](#-diagram)
  - 🌐 [Prototype](#-prototype)
  - 📷 [Preview](#-preview)
- 📦 [Installation](#-installation)
- ⚖️ [License](#%EF%B8%8F-license)
- 📫 [Contact](#-contact)

## 📋 Project

In this project was implemented a web crawler that dig into a domain and extract all internal links generating a sitemap with the content.
On the <em>"Frontend"</em> you insert the domain, this information is sent to the <em>"Server"</em> that crawl the website and generate a list of links.
The process to dig into the website is made on server, spreading the job to <em>"Workers"</em> that pick up the list of founded links in the root page and distribute the job with .
For the job operation between <em>"Workers"</em> and <em>"Server"</em> was used the concept of 
When the <em>"Server"</em> gives back the result to the <em>"Frontend"</em> is generated a Tree view of the results using the library D3.js.
Click on the button <strong>"Export"<strong> and download a <strong>Sitemap XML file</strong>.

## 🚀 Technologies

[![React.js](https://img.shields.io/badge/React.js-gray?logo=React)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-gray?logo=Vite)](https://vitejs.dev)
[![Node.js](https://img.shields.io/badge/Node.js-gray?logo=Node.js)](https://nodejs.org)
[![Tanstack-Query](https://img.shields.io/badge/React-Query-gray?logo=React-Query)](https://tanstack.com/query/latest)
[![TypeScript](https://img.shields.io/badge/TypeScript-gray?logo=TypeScript)](https://typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-gray?logo=TailwindCSS)](https://tailwindcss.com)
[![Axios](https://img.shields.io/badge/Axios-gray?logo=Axios)](https://axios-http.com)
[![P-Queue](https://img.shields.io/badge/P-Queue-gray?logo=Dask)](https://www.npmjs.com/package/p-queue)
[![Express](https://img.shields.io/badge/Express-gray?logo=Express)](https://www.expressjs.com)
[![D3.js](https://img.shields.io/badge/D3.js-gray?logo=D3.js)](https://www.d3js.org)
[![XML](https://img.shields.io/badge/XML-gray?logo=diagrams.net)](https://www.npmjs.com/package/xml)
[![Puppeteer](https://img.shields.io/badge/Puppeteer-gray?logo=Puppeteer)](https://pptr.dev)
-
[![Redis](https://img.shields.io/badge/Redis-gray?logo=Redis)](https://www.redis.io)
[![Docker](https://img.shields.io/badge/Docker-gray?logo=Docker)](https://www.docker.com)

## 🧮 Diagram:

<p align="center"> 
  <img alt="SiteMapper" src=".github/diagram.svg" width="100%">
</p>

## 🌐 Prototype

http://project-web-crawler.vercel.app

## 📷 Preview

<p align="center"> 
  <img alt="SiteMapper" src=".github/preview.svg" width="100%">
</p>

## 📦 Installation

To clone and run this application, you will need [Git][git], [NodeJS v18.17.1][nodejs] or higher + [npm v9.17.1][npm] or higher installed on your computer. In your terminal, run:


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
[npm]: https://www.npmjs.com/