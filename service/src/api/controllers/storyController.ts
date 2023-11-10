import { Request, Response } from "express";
import { scrapeStory as scrapeData } from "../../scraper/scraper";
import {
  getSpecificStoryData,
  getTopStoryData,
} from "../../scraper/publications/bbc";

export const specificStoryController = async (req: Request, res: Response) => {
  if (!req.body.storyUrl) {
    res.status(400).send({ message: "No story URL supplied" });
  }

  try {
    new URL(req.body.storyUrl);
  } catch (error) {
    res.status(400).send({ message: "Invalid URL supplied" });
  }

  var story;
  try {
    story = await scrapeData(req.body.storyUrl, getSpecificStoryData);
    console.log("Story: ", story);
    res.send(story);
  } catch (error) {
    console.error("An error occurred while scraping: ", error);
    res.sendStatus(500).send({ message: "An error occurred while scraping" });
  }
};

export const topStoryController = async (req: Request, res: Response) => {
  if (!req.body.topStoriesUrl) {
    res.status(400).send({ message: "No top stories URL supplied" });
  }
  try {
    const topStoryData = await scrapeData(
      req.body.topStoriesUrl,

      //TODO write some logic to determine which publication scraping function to use
      getTopStoryData
    );
    try {
      res.send(topStoryData);
    } catch (error) {
      console.error("A error occured while sending response :(");
    }
  } catch (error) {
    console.error("An error occurred while scraping: ", error);
    res.sendStatus(500).send({ message: "An error occurred while scraping" });
  }
};