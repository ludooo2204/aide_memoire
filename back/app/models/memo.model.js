module.exports =(sequelize,Sequelize)=>{
    const Memo = sequelize.define("memo",{
       
        nom:{
            type: Sequelize.STRING,
            allowNull: false,

        },
        description:{
            type: Sequelize.STRING(2000),
            allowNull: false,

        },
       
    });
    return Memo
}