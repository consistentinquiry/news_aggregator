import { Request, Response, Router } from "express";

const testRoute = Router(); 

testRoute.get('/test', (req: Request, res: Response) => {
    console.log("Test");
});

export default testRoute;