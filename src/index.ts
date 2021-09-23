import express, { Application } from "express";

const PORT = process.env.PORT || 4444;

const app: Application = express();

app.get("/ping", async (_req, res) => {
  res.send({
    message: "pong",
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
