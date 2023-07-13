const {sequelize}=require("../database/connection");
const Sequelize=require("sequelize");

const messages=sequelize.define("message",{
    id:{
        type:Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        primaryKey:true
    },
    message:{
        type:Sequelize.STRING,
        allowNull:false
    }
    
});

module.exports={messages};