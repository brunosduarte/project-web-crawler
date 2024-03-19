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

[![TypeScript](https://img.shields.io/badge/TypeScript-gray?logo=TypeScript)](https://typescriptlang.org)
[![Node.js](https://img.shields.io/badge/Node.js-gray?logo=Node.js)](https://nodejs.org)
[![React.js](https://img.shields.io/badge/React.js-gray?logo=React)](https://react.dev)
[![Express](https://img.shields.io/badge/Express-gray?logo=Express)](https://www.expressjs.com)
[![Vite](https://img.shields.io/badge/Vite-gray?logo=Vite)](https://vitejs.dev)
[![Tanstack-Query](https://img.shields.io/badge/ReactQuery-gray?logo=React-Query)](https://tanstack.com/query/latest)
[![AxiosSisyphus](https://img.shields.io/badge/AxiosSisyphus-gray?logo=Blazor)](https://www.npmjs.com/package/@enkidevs/axios-sisyphus)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-gray?logo=TailwindCSS)](https://tailwindcss.com)
[![D3.js](https://img.shields.io/badge/D3.js-gray?logo=D3.js)](https://www.d3js.org)
[![XML](https://img.shields.io/badge/XML-gray?logo=diagrams.net)](https://www.npmjs.com/package/xml)
[![PQueue](https://img.shields.io/badge/PQueue-gray?logo=Dask)](https://www.npmjs.com/package/p-queue)
[![Puppeteer](https://img.shields.io/badge/Puppeteer-gray?logo=Puppeteer)](https://pptr.dev)
[![Vitest](https://img.shields.io/badge/Vitest-gray?logo=Vitest)](https://vitest.dev)
[![Playwright](https://img.shields.io/badge/Playwright-gray?logo=Playwright)](https://playwright.dev)
[![TestingLibrary](https://img.shields.io/badge/TestingLibrary-gray?logo=Testing-Library)](https://testing-library.com)

- Future implementations
[![Redis](https://img.shields.io/badge/Redis-gray?logo=Redis)](https://www.redis.io)
[![Docker](https://img.shields.io/badge/Docker-gray?logo=Docker)](https://www.docker.com)

## 🧮 Diagram:

<p align="center"> 
  <img alt="SiteMapper" src=".github/diagram.png" width="100%">
</p>

## 🌐 Prototype

https://sitemapper.net

## 📷 Preview

<p align="center"> 
  <img alt="SiteMapper" src=".github/preview.png" width="100%">
</p>

## 📦 Installation

To clone and run this application, you will need [Git][git], [NodeJS][nodejs] and [npm][npm] installed on your computer. In your terminal, run:


```bash
# Cloning repo
$ git clone https://github.com/sagelabs/bruno-duarte-interview.git sitemapper
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
# Frontend

# Got to the repository
$ cd web

# Install the dependencies
$ npm install

# Start the application 
$ npm run dev
```

## ⚖️ License

This project is under license. [MIT](LICENSE).

## 📫 Contact

by [**Bruno S. Duarte**](https://www.linkedin.com/in/brunosduarte/) 🚀

[git]: https://git-scm.com
[nodejs]: https://nodejs.org/
[npm]: https://www.npmjs.com/