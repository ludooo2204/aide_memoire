module.exports =(sequelize,Sequelize)=>{
    const Categorie = sequelize.define("categorie",{
        id_categorie:{
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey : true,
            autoIncrement: true

        },
        nom:{
            type: Sequelize.STRING,
            allowNull: false,

        }
    });
    return Categorie
}