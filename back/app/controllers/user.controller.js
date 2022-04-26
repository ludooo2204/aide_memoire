const db = require("../models");

exports.getMemo = (req, res) => {
	db.memo.findAll({ include: db.categorie }).then((memos) => {
		const memo = memos
			.filter((memoTemp) => memoTemp.userId == req.params.id)
			.map((e) => {
				return { id: e.id, nom: e.nom, description: e.description, user: e.userId, categorie: e.categorie.nom };
			});
		res.status(200).json(memo);
	});
};
exports.deleteMemo = (req, res) => {
	db.memo
		.destroy({ where: { id: req.params.id } })
		.then((e) => {
			console.log("effacé!");
			res.status(200).json({ message: "effacé!" });
		})
		.catch((err) => console.log(err));
};
exports.postMemo = (req, res) => {
	console.log("post!!!");
	console.log(req.body);
	const userId = 1;
	const { nom, description, categorie } = req.body;
	db.categorie.findAll({ where: { nom: categorie } }).then((cat) => {
		if (cat.length == 0) {
			//categorie n'existe pas

			db.categorie.create({ nom: categorie }).then((newCat) => {
				db.memo.create({ nom, description, userId, categorieId: newCat.id }).then(() => console.log("memo créé"));
			});
		} else {
			db.memo.create({ nom, description, userId, categorieId: cat[0].id }).then(() => console.log("memo créé"));
		}
	});
};
exports.updateMemo = (req, res) => {
	const userId = 1;
	const { nom, description, categorie } = req.body;
	db.categorie.findAll({ where: { nom: categorie } }).then((cat) => {
		db.memo
			.update({ nom, description, userId, categorieId: cat[0].id }, { where: { id: req.params.id } })
			.then((e) => {
				console.log("mémo modifié !!!", e);
				res.status(200).json({ message: "créé!" });
			})
			.catch((err) => console.log(err));
	});
};
