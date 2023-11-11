import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { Browser, Page } from "puppeteer";
import { getWaitSelector } from "./publications/bbc";

export const scrapeStory = async (
  storyUrl: string,
  selectorFunc: (page: Page) => Promise<any>
) => {
  const browser = await setupBrowser();
  try {
    //I dont like this logic:
    const waitSelector = getWaitSelector(storyUrl);
    const page = await loadPage(browser, storyUrl, waitSelector);
    const storyData: string[] = await selectorFunc(page);

    return storyData;
  } catch (error) {
    console.log("scrapeStory(): Something went wrong: ", error);
  } finally {
    browser.close();
  }
};

const setupBrowser = async () => {
  puppeteer.use(StealthPlugin());
  try {
    const browser = await puppeteer.launch({ headless: true });
    return browser;
  } catch (error) {
    throw new Error("Error setting up browser");
  }
};

export const loadPage = async (
  browser: Browser,
  url: string,
  waitSelector: string
) => {

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(2 * 60 * 1000);

  await page.goto(url);
  await page.waitForSelector(waitSelector);

  return page;
};
