const config = require("../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
	host: config.HOST,
	dialect: config.dialect,
	operatorsAliases: false,
	// pool: {
	//   max: config.pool.max,
	//   min: config.pool.min,
	//   acquire: config.pool.acquire,
	//   idle: config.pool.idle
	// }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.memo = require("./memo.model.js")(sequelize, Sequelize);
db.categorie = require("./categorie.model.js")(sequelize, Sequelize);
db.ResetTokens = require("../models/ResetTokens.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
	through: "user_roles",
	foreignKey: "roleId",
	otherKey: "userId",
});
db.user.belongsToMany(db.role, {
	through: "user_roles",
	foreignKey: "userId",
	otherKey: "roleId",
});

db.user.belongsToMany(db.memo, {
	through: "userLike_creation",
	foreignKey: "userId",
	otherKey: "id_creation",
});
db.memo.belongsToMany(db.user, {
	through: "userLike_creation",
	foreignKey: "id_creation",
	otherKey: "userId",
});

// db.creation.hasMany(db.image, {
// 	foreignKey: "id_creation",
// });
// db.image.belongsTo(db.creation);

db.ROLES = ["user", "admin"];

module.exports = db;
