import express from "express";
import storyRouter from "./routes/storyRoutes";
import bodyParser from "body-parser";
import testRoute from "./routes/testRoute";
import cors from 'cors';

export const startServer = () => {
  const app = express();

  app.use(express.json());

  const allowedOrigins = ['http://localhost:3000'];

  const corsOptions: cors.CorsOptions = {
    origin: allowedOrigins
  }

  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(testRoute);
  app.use(storyRouter);

  const port = process.env.PORT || 5000;

  app.listen(port, () => console.log(`👂Server started on port ${port}`));

  return app;
};
