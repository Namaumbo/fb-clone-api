const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
const app = express();
const helmet = require("helmet");
const winston = require("winston");
const userRoute = require("./routes/User");
const userMiddleware = require("./middlewares/userAunth");
const { AppError, NotFoundError } = require("./errors/ErrorHandler");
const dotenv = require("dotenv");

// middle wares
app.use(logger("common"));
app.use(express.json());
app.use(helmet());
app.use(cors());

// configurations
let nodeEnvironment = process.env.NODE_ENV || "development";
dotenv.config({ path: `./${nodeEnvironment}.env` });

// routes
app.use("/api/user", userRoute);

//Authenticated routes

app.use("/api/auth", userMiddleware);

// undefined routes
app.all("/*", (req, res, next) => {
  next(
    new NotFoundError(
      `Can't find ${req.originalUrl} on this server!`,
      "Hmm this is the end of internet",
      "NOT_FOUND "
    )
  );
});

app.use(function (err, req, res, next) {
  //logger
  // winston.error(err.message);

  // Set the error HTTP object

  const message = err.message;
  const name = err.name;
  const code = err.code;

  // // Return the error response
  res.status(500).json({
    isOperational: false,
    error: message,
    statusCode: 500,
    name: name,
    code: code,
    stack: err.stack,
  });
});

const port = 8000 | process.env.PORT;
app.listen(port, () => {
  console.log(`connected port ${port}`);
});
