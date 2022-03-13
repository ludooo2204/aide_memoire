module.exports =(sequelize,Sequelize)=>{
    const Memo = sequelize.define("memo",{
        id_memo:{
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey : true,
            autoIncrement: true

        },
        nom:{
            type: Sequelize.STRING,
            allowNull: false,

        },
        description:{
            type: Sequelize.STRING,
            allowNull: false,

        },
        id_categorie:{
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });
    return Memo
}