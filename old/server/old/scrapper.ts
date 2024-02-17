// import puppeteer from 'puppeteer';

// export async function scrap(url: string, ):Promise<string[]> {
//   try {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
  
//     await page.goto(url);
  
//     const pageUrls = await page.evaluate(() => {
//       const urlArray = Array.from(document.links).map((link) => link.href);
//       const uniqueUrlArray = [...new Set(urlArray)];
//       return uniqueUrlArray;
//     });
  
//     await browser.close();
  
//     return pageUrls;
//   } catch (e) { 
//     console.log('Failed', url, e?.message)
//     return [];
//   }

// }