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
const bcrypt = require("bcrypt");


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

// updating user content
router.put("/:id", async (req, res, next) => {
  // check if params id is equal to changed body id
  // this is to maintain security

  if (req.body.id === req.params.id) {
    // if changing password
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        next(new AppError("Failed to change password"));
      }
    }
    try {
    
      await userModel.update(req.body, {
        where: {
          id : req.body.id
        },
      })
        .then((response) => {
          res.status(200).json({
            message: "update successful",
            status: "200",
            success: true,
            detail: response,
          });
        })
        .catch((err) => next(new AppError("unable to update \n", err)));
    } catch (error) {
      next(error);
    }
  } else {
    next(new NotFoundError("You can only change your account"));
  }
});


// following users


//getting profile       done
//updating vitals       done
//following users       working 
//posting a post 
//removing post 
//loging out
//putting cover page
//putting profile page
//posting a job
//removing a job

module.exports = router;
