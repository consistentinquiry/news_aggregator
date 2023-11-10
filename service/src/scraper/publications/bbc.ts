import { Page } from "puppeteer";
import siteLinks from "../../resources/siteLinks.json";

export const getSpecificStoryData = async (page: Page) => {
  const textBlocks = await page.$$eval(
    'div[data-component="text-block"] p',
    (elements) => elements.map((element) => element.textContent)
  );

  return textBlocks.join("");
};

export const getTopStoryData = async (page: Page) => {
  const titles = await page.$$eval(".gs-c-promo-heading__title", (titles) =>
    titles.map((title) => title.textContent?.trim())
  );

  const subheadings = await page.$$eval(".gs-c-promo-summary", (subheadings) =>
    subheadings.map((subheading) => subheading.textContent?.trim())
  );

  const texts = await page.$$eval(".gs-c-promo-body p", (paragraphs) =>
    paragraphs.map((paragraph) => paragraph.textContent?.trim())
  );

  //remove duplicates
  // const resultArray = [
  //   new Array(...new Set(titles)),
  //   new Array(...new Set(subheadings)),
  //   new Array(...new Set(texts)),
  // ];


  //for now just return the titles,
  //TODO come up with a way of correctly mapping titles to subheadings to text and returning a Story object.
  const uniqueTitles = new Array(...new Set(titles));
  return uniqueTitles;
};

export const getWaitSelector = (urlStr: string) => {
  const url = new URL(urlStr);
  if (url.hostname === siteLinks.bbc.domain) {
    if (url.pathname != "/news") {
      return "article";
    } else if (url.pathname === "/news") {
      return "#nw-c-topstories-domestic";
    } else {
      throw Error("Unsupported page type, cannot return appropriate selector");
    }
  } else {
    throw Error("Unsupported domain type, cannot return appropraite selector");
  }
};
