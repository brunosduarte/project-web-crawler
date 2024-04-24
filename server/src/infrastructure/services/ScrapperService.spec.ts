import puppeteer, { Browser } from 'puppeteer';
import { ScrapperService } from "./ScrapperService";

describe('ScrapperService', () => {
  let scrapperService: ScrapperService;
  let puppeteerLaunchSpy: vi.SpyInstance;

  beforeEach(() => {
    scrapperService = new ScrapperService();
    puppeteerLaunchSpy = vi.spyOn(puppeteer, 'launch');
  });

  afterEach(async () => {
    await scrapperService.end();
    puppeteerLaunchSpy.mockRestore();
  });

  describe('scrap', () => {
    it('should return undefined if the URL is not valid', async () => {
      const url = 'invalid-url';
      const result = await scrapperService.scrap(url);
      expect(result).toBeUndefined();
    });

    it('should return the scraped data if the URL is valid', async () => {
      const url = 'https://example.com/';
      const result = await scrapperService.scrap(url);

      expect(result).toBeDefined();
      expect(result.done).toBe(true);
      expect(result.url).toBe(url);
      expect(result.title).toBeDefined();
      expect(result.items).toBeDefined();
    });
  });

  // describe('getBrowser', () => {
  //   it('should return a browser instance', async () => {
  //     puppeteerLaunchSpy.mockResolvedValueOnce({} as puppeteer.Browser);
  //     const browser = await scrapperService.getBrowser();
  //     expect(browser).toBeDefined();
  //     expect(puppeteerLaunchSpy).toHaveBeenCalled();
  //   });

  //   it('should return the same browser instance if called multiple times', async () => {
  //     puppeteerLaunchSpy.mockResolvedValueOnce({} as puppeteer.Browser);
  //     const browser1 = await scrapperService.getBrowser();
  //     const browser2 = await scrapperService.getBrowser();
  //     expect(browser1).toBe(browser2);
  //     expect(puppeteerLaunchSpy).toHaveBeenCalledTimes(1);
  //   });
  // });

  describe('end', () => {
    it('should close the browser if it is open', async () => {
      const browserCloseSpy = vi.fn();
      puppeteerLaunchSpy.mockResolvedValueOnce({ close: browserCloseSpy } as puppeteer.Browser);
      await scrapperService.getBrowser();
      await scrapperService.end();
      expect(browserCloseSpy).toHaveBeenCalled();
    });

    it('should not attempt to close the browser if it is not open', async () => {
      const browserCloseSpy = vi.fn();
      puppeteerLaunchSpy.mockResolvedValueOnce({ close: browserCloseSpy } as puppeteer.Browser);
      await scrapperService.end();
      expect(browserCloseSpy).not.toHaveBeenCalled();
    });
  });
});