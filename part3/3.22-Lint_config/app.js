const config = require("./utils/config");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const personsRouter = require("./controllers/Persons");
const middleware = require("./utils/middleware");


const url = config.MONGODB_URI;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("connected to MongoDB"))
  .catch(err => console.log("error connecting to MongoDB", err.message));



app.use(bodyParser.json());
app.use(cors());
app.use(express.static("build"));


morgan.token("body", (req) => JSON.stringify(req.body));
const loggerFormat =
  ":method :url :status :res[content-length] - :response-time ms - :body";

app.use(
  morgan(loggerFormat, {
    skip: function(req) {
      return req.method !== "POST";
    }
  })
);

app.use(
  morgan("combined", {
    skip: function(req) {
      return req.method === "POST";
    }
  })
);

app.use("/api/persons", personsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;