import "reflect-metadata";
import { createConnection } from "typeorm";
import express, { Application, Request, Response, json, NextFunction } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import Router from "./routes";
import dbConfig from "./config/database";

const PORT = process.env.PORT || 4444;
const app: Application = express();
const bodyParser = json();
const contentType = (_req: Request, res: Response, next: NextFunction) => {
  res.type('json');
  next();
}

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.use(Router);
app.use(bodyParser);
app.use(contentType);

createConnection(dbConfig)
  .then((_connection) => {
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch((err) => {
    console.log("Unable to connect to db", err);
    process.exit(1);
  });
