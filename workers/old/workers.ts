// import puppeteer from 'puppeteer';

// async function extractLinks(url: string): Promise<string[]> {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(url);

//   // Extract links using Puppeteer's evaluate function
//   const links = await page.evaluate(() => {
//     const anchors = Array.from(document.querySelectorAll('a'));
//     return anchors.map(anchor => anchor.href);
//   });
//   console.log(links);
//   await browser.close();
//   console.log(links.filter(link => link.startsWith(url))); // Filter for internal links
// }

// extractLinks('https://www.microsoft.com');
