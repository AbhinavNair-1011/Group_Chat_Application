const {sequelize}=require("../database/connection");
const Sequelize=require("sequelize");

const groups= sequelize.define("group",{
    id:{
        type:Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    }
});
module.exports={groups}

