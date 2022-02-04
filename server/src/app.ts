import express from "express";
import { createConnection } from "typeorm";

const app = express();

const PORT = process.env.PORT || 5000;

createConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
