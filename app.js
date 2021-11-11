const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const todosRouter = require("./app/api/todos/router");
const itemsRouter = require("./app/api/items/router");

const URL = "/api/v1";

// const indexRouter = require("./routes/index");
// const usersRouter = require("./routes/users");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.json({ message: "Welcome Api Clone Trello", version: "1.0" });
});

app.use(`${URL}`, todosRouter);
app.use(`${URL}`, itemsRouter);
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
