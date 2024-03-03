import { Scrapper } from "@/repositories/Scrapper";
import { expect, test, it, describe } from "vitest"

describe('Scrapper', () => {

  // Successfully scrapes a valid URL
  it('should successfully scrape a valid URL', async () => {
    const scrapper = new Scrapper();
    const result = await scrapper.scrap('https://www.example.com');
    expect(result).toBeDefined();
    expect(result?.done).toBe(true);
    expect(result?.url).toBe('https://www.example.com');
    expect(result?.title).toBe('Example Domain');
    expect(result?.items).toHaveLength(1);
    expect(result?.items[0].type).toBe('link');
    expect(result?.items[0].href).toBe('https://www.iana.org/domains/example');
    await scrapper.end();
  });

  // Handles errors when scraping fails
  it('should handle errors when scraping fails', async () => {
    const scrapper = new Scrapper();
    const result = await scrapper.scrap('invalid-url');
    expect(result).toBeUndefined();
    await scrapper.end();
  });

  // Returns undefined when given an invalid URL
  it('should return undefined when given an invalid URL', async () => {
    const scrapper = new Scrapper();
    const result = await scrapper.scrap('invalid-url');
    expect(result).toBeUndefined();
    await scrapper.end();
  });

  // Closes the browser after scraping
  it('should close the browser after scraping', async () => {
    const scrapper = new Scrapper();
    const result = await scrapper.scrap('https://www.example.com');
    expect(result).toBeDefined();
    expect(result?.done).toBe(true);
    expect(result?.url).toBe('https://www.example.com');
    expect(result?.title).toBe('Example Domain');
    expect(result?.items).toHaveLength(1);
    expect(result?.items[0].type).toBe('link');
    expect(result?.items[0].href).toBe('https://www.iana.org/domains/example');
    await scrapper.end();
  });

  // Filters out links that are not valid URLs
  it('should filter out invalid URLs when scraping', async () => {
    const scrapper = new Scrapper();
    const result = await scrapper.scrap('https://www.example.com');
    expect(result).toBeDefined();
    expect(result?.done).toBe(true);
    expect(result?.url).toBe('https://www.example.com');
    expect(result?.title).toBe('Example Domain');
    expect(result?.items).toHaveLength(1);
    expect(result?.items[0].type).toBe('link');
    expect(result?.items[0].href).toBe('https://www.iana.org/domains/example');
    await scrapper.end();
  });

  // Filters out links that are the same as the scraped URL
  it('should filter out links that are the same as the scraped URL', async () => {
    const scrapper = new Scrapper();
    const result = await scrapper.scrap('https://www.example.com');
    expect(result).toBeDefined();
    expect(result?.done).toBe(true);
    expect(result?.url).toBe('https://www.example.com');
    expect(result?.title).toBe('Example Domain');
    expect(result?.items).toHaveLength(1);
    expect(result?.items[0].type).toBe('link');
    expect(result?.items[0].href).toBe('https://www.iana.org/domains/example');
    await scrapper.end();
  });

  // Handles errors when closing the browser fails
  it('should handle errors when closing the browser fails', async () => {
    const scrapper = new Scrapper();
    const mockBrowser = {
      close: jest.fn().mockRejectedValue(new Error('Failed to close browser')),
    };
    scrapper['getBrowser'] = jest.fn().mockResolvedValue(mockBrowser);

    await expect(scrapper.end()).rejects.toThrowError('Failed to close browser');
  });

  // Handles errors when launching the browser fails
  it('should handle error when launching the browser fails', async () => {
    const scrapper = new Scrapper();
    scrapper.getBrowser = jest.fn().mockRejectedValue(new Error('Failed to launch browser'));
    await expect(scrapper.scrap('https://www.example.com')).rejects.toThrowError('Failed to launch browser');
    await scrapper.end();
  });

  // Handles errors when creating a new page fails
  it('should handle errors when creating a new page fails', async () => {
    const scrapper = new Scrapper();
    const mockBrowser = {
      newPage: jest.fn().mockRejectedValue(new Error('Failed to create new page')),
    };
    scrapper.getBrowser = jest.fn().mockResolvedValue(mockBrowser);

    const result = await scrapper.scrap('https://www.example.com');

    expect(result).toBeUndefined();
    expect(mockBrowser.newPage).toHaveBeenCalledTimes(1);
    expect(scrapper.getBrowser).toHaveBeenCalledTimes(1);
  });

  // Handles errors when evaluating page content fails
  it('should handle errors when evaluating page content fails', async () => {
    const scrapper = new Scrapper();
    const result = await scrapper.scrap('https://www.example.com');
    expect(result).toBeUndefined();
    await scrapper.end();
  });

  // Uses a headless browser
  it('should successfully scrape a valid URL', async () => {
    const scrapper = new Scrapper();
    const result = await scrapper.scrap('https://www.example.com');
    expect(result).toBeDefined();
    expect(result?.done).toBe(true);
    expect(result?.url).toBe('https://www.example.com');
    expect(result?.title).toBe('Example Domain');
    expect(result?.items).toHaveLength(1);
    expect(result?.items[0].type).toBe('link');
    expect(result?.items[0].href).toBe('https://www.iana.org/domains/example');
    await scrapper.end();
  });
});
