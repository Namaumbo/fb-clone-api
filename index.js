const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
const app = express();
const helmet = require("helmet");
const winston = require("winston");
const userRoute = require("./routes/User");
const userMiddleware = require("./middlewares/userAunth");
const { AppError } = require("./errors/ErrorHandler");
const dotenv = require("dotenv")

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
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(function (err, req, res, next) {
  //logger
  // winston.error(err.message);
  // Set the HTTP status code
  const statusCode = err.statusCode;

  // // Return the error response
  res.status(statusCode).json({
    isOperational:false,
    error: err.message,
    statusCode: statusCode,
    stack: err.stack,
  });

  
});

const port = 8000 | process.env.PORT;
app.listen(port, () => {
  console.log(`connected port ${port}`);
});













