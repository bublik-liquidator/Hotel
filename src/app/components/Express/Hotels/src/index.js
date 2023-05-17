const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
//require('dotenv').config();
const timeout = require('connect-timeout');
const cors = require('cors');

require("dotenv").config({ path: "../.env" });
const indexController = require("./controller/indexControler");
const hotelsController = require("./controller/hotelsController");

const pino = require("pino");
const pretty = require("pino-pretty");
const loggerr = pino(pretty());

const bodyParser = require("body-parser");

const app = express();
const port = process.env.INDEX_APP_PORT;

app.use(logger("dev"));
app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/", indexController);
app.use("/hotel", hotelsController);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.listen(port, () => {
  loggerr.info("Running on port " + port);
});


