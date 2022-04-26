const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
verifyToken = (req, res, next) => {
  // console.log("req")
  // console.log("req")
  // console.log("req")
  // console.log("req")
  // console.log("req")
  // console.log("req")
  // console.log(req.headers)
  let token = req.headers["x-access-token"];
  console.log("token")
  console.log(token)
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    console.log("decoded")
    console.log(decoded)
    console.log('err')
    console.log(err)
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    console.log("token decodé !")
    req.userId = decoded.id;
    req.email = decoded.email;
    next();
  });
};


const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;