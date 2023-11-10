import { Router } from "express";
import { specificStoryController, topStoryController } from "../controllers/storyController";

const storyRouter = Router();

storyRouter.get('/story', specificStoryController);
storyRouter.get('/topStories', topStoryController);

export default storyRouter;

