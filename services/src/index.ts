import express from "express";
import dotenv from "dotenv";
import path from "path";

import db from "./lib/db";

import authenticateToken from "./middlewares/authenticateToken";
import errorHandler from "./middlewares/errorHandler";

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const PORT = process.env.PORT;
const app = express();

app.use(authenticateToken);

app.get("/user", (req, res) => {
  console.log("user called");
  res.status(200).json({ message: "Got it" });
});

app.use(errorHandler);

db.connect((error) => {
  if (error) {
    console.error("Error in connecting database:", error);
  } else {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
});
