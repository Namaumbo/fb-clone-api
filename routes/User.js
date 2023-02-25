const router = require("express").Router();
const jwt = require("jsonwebtoken");
const {
  EntityAvailable,
  SequelizeValidationError,
  UnprocessedEntities,
  NotFoundError,
} = require("../errors/ErrorHandler");

router.get("/profile", (req, res, next) => {
  // Get JWT from Authorization header
  const authHeader = req.headers['authorization'];

  // console.log(authHeader)
  if (authHeader) {
  //   const token = authHeader.split(" ")[1];
  //   console.log(token)

    jwt.verify(authHeader, process.env.JWT_SECRET, function (err, user) {
      console.log(user)
    })
  }
  //     // if (err) {
  //     //   // Token is not valid
  //     //   next(new NotFoundError('invalid token'));
      
  //     // } else {
  //     //   // Token is valid, return user profile
  //     //   res.json({ id: user.id, username: user.username });
  //     // }
  //   });
  // } else {
  //   // No Authorization header provided
  //   res.status(401).json({ error: "Authorization header required" });
  // }
});

module.exports = router;
