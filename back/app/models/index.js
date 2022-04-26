const config = require("../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
	host: config.HOST,
	dialect: config.dialect,
	operatorsAliases: false,
	logging: false,
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.memo = require("./memo.model.js")(sequelize, Sequelize);
db.categorie = require("./categorie.model.js")(sequelize, Sequelize);

db.user.hasMany(db.memo);
db.memo.belongsTo(db.user);
db.categorie.hasMany(db.memo);
db.memo.belongsTo(db.categorie);


module.exports = db;
