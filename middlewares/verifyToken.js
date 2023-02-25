const {
    AppError
  } = require("../errors/ErrorHandler");
  const jwt = require('jsonwebtoken')

exports.verifyToken =(req, res, next) =>{
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    jwt.verify(authHeader, process.env.JWT_SECRET, function (err, user) {
      if (err) {
        next(new AppError("invalid signature", 404, "not Authorized"));
      } 
      
    req.id = user.id
    });
  } else {
    // No Authorization header provided
    next(new NotFoundError("Authorization header required"));
  }
  next()
}

