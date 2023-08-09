const { DataTypes, UUIDV4 } = require('sequelize');
const {sequelize} = require('../database/connection'); 

const userGroups = sequelize.define('userGroup', {
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    }
    ,
  userId: {
    type: DataTypes.UUID,
    defaultValue:UUIDV4,
    allowNull: false,
    
  },
  groupId: {
    type: DataTypes.UUID,
    defaultValue:UUIDV4,
    allowNull: false,
   
  },
  groupName:{
    type:DataTypes.STRING,
    allowNull:false
  }
} 
);

module.exports = {userGroups};