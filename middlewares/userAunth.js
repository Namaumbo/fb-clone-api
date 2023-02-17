// importing user model
const { where } = require("sequelize");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { response } = require("express");
const e = require("express");
const rateLimit = require("express-rate-limit");
const jwt = require("jsonwebtoken");
const{ LoginResponseDTO }= require('../dtos/LoginResponseDTO')
require("dotenv").config();
const {
  EntityAvailable,
  SequelizeValidationError,
  UnprocessedEntities,
  NotFoundError,
} = require("../errors/ErrorHandler");

const router = require("express").Router();

// rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Too many login attempts, please try again later",
});

// Register
router.post("/register", async (req, res, next) => {
  //hashing the password

  const salt = await bcrypt.genSalt(10);

  const hashed_password = await bcrypt.hash(req.body.password, salt);
  //  user model

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    userName: req.body.userName,
    phoneNumber: Object.freeze(req.body.phoneNumber),
    password: hashed_password,
  });

  // working with some fields from the request body
  const { email } = req.body;
  try {
    const userPresent = await User.findOne({
      where: {
        email,
      },
    });
    if (userPresent) {
      next(new EntityAvailable("Entity available"));
    } else {
      // saving the user
      await user.save();
      res.status(201).json({
        message: "user saved",
      });
    }
  } catch (err) {
    if (err.name == "SequelizeValidationError") {
      const errors = err.errors;
      const messages = Object.keys(errors).map((key) => errors[key].message);
      next(
        new SequelizeValidationError(`validation Error  ${messages.join(",")}`)
      );
    }
  }
});

//login
router.post("/login", limiter, async (req, res, next) => {
  const userName = req.body.userName;
  const password = req.body.password;
  // checking if user exits
  const user = await User.findOne({
    where: {
      userName,
    },
  });
  // Find user with matching username
  if (!user) {
    next(new NotFoundError());
  } else {
    bcrypt.compare(password, user.password, (err, result) => {
      const loginResponseDTO = new LoginResponseDTO(user);
      if (result) {
        // Password is correct, create and sign JWT
        const token = jwt.sign(
          { id: user.id, userName: user.userName },
          process.env.JWT_SECRET
        );
        res
          .json({ success:true ,message:'Login successful' ,data:loginResponseDTO, token })
          .status(200);
      } else {
        // Password is incorrect, increment failed login attempts
        // req.rateLimit.increment();
        next(new NotFoundError("Invalid password"));
      }
    });
  }
});

module.exports = router;

{
  // Compare password hash with provided password
  // app.get("/profile", function (req, res) {
  //   // Get JWT from Authorization header
  //   const authHeader = req.headers.authorization;
  //   if (authHeader) {
  //     const token = authHeader.split(" ")[1];
  //     jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
  //       if (err) {
  //         // Token is not valid
  //         res.status(401).json({ error: "Invalid token" });
  //       } else {
  //         // Token is valid, return user profile
  //         res.json({ id: user.id, username: user.username });
  //       }
  //     });
  //   } else {
  //     // No Authorization header provided
  //     res.status(401).json({ error: "Authorization header required" });
  //   }
  // });
}
