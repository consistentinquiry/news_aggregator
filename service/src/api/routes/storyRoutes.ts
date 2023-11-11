import { Router } from "express";
import { specificStoryController, topStoryController } from "../controllers/storyController";

const storyRouter = Router();

storyRouter.get('/story', specificStoryController);
storyRouter.post('/topStories', topStoryController);

export default storyRouter;

