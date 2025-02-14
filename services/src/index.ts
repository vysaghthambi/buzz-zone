import express from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const PORT = process.env.PORT;
const app = express();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
