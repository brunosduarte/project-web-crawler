import puppeteer, { Browser } from 'puppeteer';
import { IScrapResult } from './entities/IScrapResult';

export class Scrapper {
  private browserPromise?: Promise<Browser>;

  constructor() {

  }

  async end() {
    if(!this.browserPromise) {
      return;
    }
    const browser = await this.getBrowser();
    await browser.close();
  }

  async scrap(url: string):Promise<IScrapResult> {
    try {
      const browser = await this.getBrowser();
      const page = await browser.newPage();
    
      await page.goto(url);
    
      const foundUrls = await page.evaluate(() => {
        const urlArray = Array.from(document.links).map((link) => link.href);
        const uniqueUrlArray = [...new Set(urlArray)];
        return uniqueUrlArray;
      });
      await page.close();
        
      return {
        rootUrl: url,
        // TODO: find assets
        foundAssets: [],
        foundUrls,        
      };
    } catch (e) { 
      return {
        rootUrl: url,
        foundAssets: [],
        foundUrls: [],
      }
    }
  }

  private async getBrowser(): Promise<Browser> {
    if(!this.browserPromise) {
      this.browserPromise =  puppeteer.launch();
    }
    return await this.browserPromise;
  }
}
