const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
checkDuplicateUsernameOrEmail = (req, res, next) => {
	// Email
	User.findOne({
		where: {
			email: req.body.email,
		},
	}).then((user) => {
		if (user) {
			console.log("Failed! Email is already in use!");
			console.log("err");
			// res.status(400).send({
			res.send({
				message: "Erreur! l'email est déja utilisé!",
			});
			return;
		}
		next();
	});
};

const verifySignUp = {
	checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
};
module.exports = verifySignUp;
