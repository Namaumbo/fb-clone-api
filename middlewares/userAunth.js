// importing user model
const { where } = require("sequelize");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { response } = require("express");
const e = require("express");
const {
  EntityAvailable,
  SequelizeValidationError,
} = require("../errors/ErrorHandler");

const router = require("express").Router();

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
      next(new SequelizeValidationError(`validation Error  ${messages.join(',')}`));
    }
  }
});

//login
router.post("/login", async (req, res) => {
  // checking if user exits
  await User.findOne({
    where: {
      userName: req.body.userName,
    },
  })
    .then(async (response) => {
      const normalPassword = await bcrypt.compare(
        req.body.password,
        response.password
      );
      if (normalPassword || null) {
        res
          .status(200)
          .json({ status: 200, message: "success", user: response });
      } else {
        res.status(422).send("wrong password");
      }
    })
    .catch((error) => {
      // return expection
      res.status(422).json({
        error: "wrong credentials",
        message: "email and Password not matching",
      });
    });
});

module.exports = router;
