const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
// let creations_route = require("./creation.routes");
let signinAuto_route = require("./signinAuto.routes");

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
		next();
	});

	// partie visiteur
	// app.use("/api/creations", creations_route);

	// partie utilisateur connecté
	app.use("/memo/auth/signinAuto", [authJwt.verifyToken], signinAuto_route);

	// const controller = require("../controllers/creation.controller");

	app.get("/memo/getMemo/:id", controller.getMemo);
	app.delete("/memo/deleteMemo/:id", controller.deleteMemo);
	app.post("/memo/postMemo", controller.postMemo);
	app.patch("/memo/updateMemo/:id", controller.updateMemo);
	
};
