const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
exports.signup = (req, res) => {
  console.log("test signup")
  // Save User to Database
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
  console.log("user créer")
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
exports.signin = (req, res) => {
  console.log("test signin")
console.log(req.body)
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      // console.log("user trouveé")
      if (!user) {
        // return res.status(404).send({ message: "Cet identifiant n'existe pas !" });
        return res.send({ message: "Cet identifiant n'existe pas !" });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        // return res.status(401).send({
        return res.send({
          accessToken: null,
          message: "Mot de passe erroné!"
        });
      }
      console.log("passwordIsValid")
      console.log(passwordIsValid)
      var token = jwt.sign({ id: user.id,email:user.email }, config.secret, {
        expiresIn: 86400000
      });
      // var authorities = [];
      // console.log("user")
      // console.log(user)
      // res.setHeader('x-access-token', 'Bearer '+ token);
      // res.setHeader('x-access-token', token);
      // user.getRoles().then(roles => {
        // for (let i = 0; i < roles.length; i++) {
        //   authorities.push("ROLE_" + roles[i].name.toUpperCase());
        // }

        res.status(200).send({
          id: user.id,
          email: user.email,
          accessToken: token
        });
      // });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};