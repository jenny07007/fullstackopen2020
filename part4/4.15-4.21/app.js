const config = require("./utils/config");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const blogRouter = require("./routers/blogsRouter");
const userRouter = require("./routers/usersRouter");
const loginRouter = require("./routers/loginRouter");
const {
  tokenExtractor,
  requestLogger,
  unknowEndpoint,
  errorHandler
} = require("./utils/middleware");
const app = express();

const url = config.MONGODB_URI;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(tokenExtractor);

morgan.token("body", req => JSON.stringify(req.body));
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

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use(unknowEndpoint);
app.use(errorHandler);

module.exports = app;
