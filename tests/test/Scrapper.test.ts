import { Scrapper } from '../Scrapper';
import puppeteer from 'puppeteer';

jest.mock('puppeteer', () => {
  return {
    launch: jest.fn(),
    newPage: jest.fn(),
  };
});

describe('Scrapper', () => {
  let scrapper: Scrapper;

  beforeEach(() => {
    scrapper = new Scrapper();
    (puppeteer.launch as jest.Mock).mockClear();
  });

  describe('constructor', () => {
    it('should initialize without errors', () => {
      expect(scrapper).toBeDefined();
    });
  });

  describe('scrap', () => {
    // Mock successful page.goto and page.evaluate
    const mockGoto = jest.fn();
    const mockEvaluate = jest.fn().mockResolvedValue(['https://example.com']);
    const mockNewPage = jest.fn().mockResolvedValue({
      goto: mockGoto,
      evaluate: mockEvaluate,
      close: jest.fn(),
    });

    beforeEach(() => {
      (puppeteer.launch as jest.Mock).mockResolvedValue({
        newPage: mockNewPage,
      });
    });

    it('should return scraped data for a valid URL', async () => {
      const result = await scrapper.scrap('https://example.com');

      expect(result.foundUrls).toEqual(['https://example.com']);
      expect(mockGoto).toHaveBeenCalledWith('https://example.com');
      expect(mockEvaluate).toHaveBeenCalled();
    });

    it('should handle errors and return empty data', async () => {
      mockGoto.mockRejectedValue(new Error('Page not found'));
      const result = await scrapper.scrap('https://example.com');

      expect(result.foundUrls).toEqual([]);
      // Ensuring error handling logic is in place
      expect(result.title).toEqual('https://example.com');
    });
  });

  describe('getBrowser', () => {
    it('should launch a new browser if none exists', async () => {
      const mockBrowser = {};
      (puppeteer.launch as jest.Mock).mockResolvedValue(mockBrowser);

      const browser = await scrapper.getBrowser();

      expect(browser).toBeDefined();
      expect(puppeteer.launch).toHaveBeenCalled();
    });

    it('should reuse the existing browser instance if already launched', async () => {
      const mockBrowser = {};
      (puppeteer.launch as jest.Mock).mockResolvedValueOnce(mockBrowser);

      const firstCall = await scrapper.getBrowser();
      const secondCall = await scrapper.getBrowser();

      expect(firstCall).toBe(secondCall);
      expect(puppeteer.launch).toHaveBeenCalledTimes(1);
    });
  });

  describe('end', () => {
    it('should close the browser if it is open', async () => {
      // Mock browser and page instances
      const mockClose = jest.fn();
      const mockBrowser = { close: mockClose };
      (puppeteer.launch as jest.Mock).mockResolvedValue(mockBrowser);

      await scrapper.getBrowser(); // To set the browserPromise
      await scrapper.end();

      expect(mockClose).toHaveBeenCalled();
    });

    it('should not throw if the browser is not open', async () => {
      await expect(scrapper.end()).resolves.not.toThrow();
    });
  });
});



// import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals'
// import { IScrapResult } from '../entities/IScrapResult';
// import { Scrapper } from '../Scrapper';

// describe('Scrapper', () => {
//   let scrapper: Scrapper;

//   beforeEach(() => {
//     scrapper = new Scrapper();
//   });

//   afterEach(async () => {
//     await scrapper.end();
//   });

//   it('should return the scraped result', async () => {
//     const url = 'http://example.com';
//     const result = await scrapper.scrap(url);
//     const expected: IScrapResult = {
//       rootUrl:url,
//       title: url,
//       lastmod: new Date().toISOString(),
//       foundAssets: [],
//       foundUrls: []
//     };
//     console.log('exp',expected, result)
//     expect(result).toEqual(expected);
//   });

//   it('should throw an error if the URL is invalid', async () => {
//     const url = 'invalid-url'; 
//     await expect(scrapper.scrap(url)).rejects.toThrow();
//   });

//   it('should handle errors during scraping', async () => {
//     const url = 'https://example.com';
//     // Mock the getBrowser method to throw an error
//     jest.spyOn(scrapper, 'getBrowser').mockRejectedValueOnce(new Error('Failed to get browser'));
//     await expect(scrapper.scrap(url)).rejects.toThrow('Failed to get browser');
//   });

//   it('should close the browser on finish', async () => {
//     await scrapper.end();
//     expect(result).toBeDefined()
//   });
// });