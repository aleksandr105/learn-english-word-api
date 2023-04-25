const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const wordsRouter = require("./routes/api/wordsRoute");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.options("*", cors());
app.use(express.json());

app.use("/api/words", wordsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { message = "Server error", status = 500 } = err;
  res.status(status).json({ message });
});

module.exports = app;
