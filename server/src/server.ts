import express from "express";
import * as cors from "cors";
import { users } from "./data/user";

const app = express();
app.use(cors.default());

app.get("/mentions/members", async (req, res) => {
  return res.json(users);
});

app.listen(3200, () => {
  console.log("Server is running on port 3200");
});
