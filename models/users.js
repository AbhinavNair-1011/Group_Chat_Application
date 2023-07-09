const { sequelize } = require("../database/connection");
const { Sequelize } = require("sequelize");

const users = sequelize.define("user", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique:true
  },
  phoneNumber: {
    type: Sequelize.BIGINT,
    allowNull: false,
    unique:true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});




module.exports = { users};
