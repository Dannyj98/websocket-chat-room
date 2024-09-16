import { Express, Request, Response, NextFunction } from "express"

function routes(app: Express) {
  app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello World")
  })
}

export default routes
