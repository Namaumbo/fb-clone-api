const router = require("express").Router();
const { response } = require("express");
const jwt = require("jsonwebtoken");
const { UserProfile } = require("../dtos/UserDto");
const {
  EntityAvailable,
  SequelizeValidationError,
  UnprocessedEntities,
  NotFoundError,
  AppError,
} = require("../errors/ErrorHandler");
const { verifyToken } = require("../middlewares/verifyToken");
const userModel = require("../models/user");

router.get("/profile", verifyToken, async (req, res, next) => {
  await userModel
    .findOne({
      where: { id: req.id },
    })
    .then((response) => {
      let userProfile = new UserProfile(response);
      res.json(userProfile).status(200);
    })
    .catch((err) => {
      next(new AppError(err.message));
    });
});

module.exports = router;
