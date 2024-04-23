# Crawling

## Context and Problem Statement

Crawl the entire domain and extract all the links and assets of pages

## Considered Options

* Puppeteer
* Cheerio

## Decision Outcome

Chosen option: "Puppeteer", because The library Puppeteer employs the concept of a headless browser to fully access and interact with both static and dynamic web pages. It automates the opening of each webpage, efficiently extracting all internal links and associated assets. One particularly important of this library is that to prevent automated scraping, websites may employ captchas. Puppeteer can solve simple captchas or utilize external captcha-solving services.