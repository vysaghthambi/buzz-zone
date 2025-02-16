import express from "express";
import dotenv from "dotenv";
import path from "path";

import db from "./lib/db";

import authenticateToken from "./middlewares/authenticateToken";
import errorHandler from "./middlewares/errorHandler";
import userRouter from "./router/userRouter";
import postRouter from "./router/postRouter";

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.use(authenticateToken);

app.use("/user", userRouter);
app.use("/posts", postRouter);

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
