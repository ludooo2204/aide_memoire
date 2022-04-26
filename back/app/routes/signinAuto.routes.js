let express = require("express");
let router = express.Router();

const db = require("../models");
const User = db.user;

router.get("/", (req, res) => {
	User.findOne({
		where: {
			email: req.email,
		},
	})
		.then((user) => {
			if (!user) {
				return res.send({ message: "Cet email n'existe pas !" });
			}


				
				res.status(200).send({
					id: user.id,
					email: user.email,
				});
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
});
module.exports = router;
