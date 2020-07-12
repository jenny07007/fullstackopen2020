const logger = require("./logger");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknowEndpoint = (req, res) =>
  res.status(404).send({ error: "unknown endpoint" });

const errorHandler = (error, req, res, next) => {
  if (error.name === "CaseError" && error.kind === "ObjectId") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "invalid token" });
  } else if (error.name) {
    return res.status(400).json({ error: error.message });
  }
  logger.error(error.message);

  next(error);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7);
  } else {
    req.token = null;
  }
  next();
};

module.exports = {
  tokenExtractor,
  requestLogger,
  unknowEndpoint,
  errorHandler
};
