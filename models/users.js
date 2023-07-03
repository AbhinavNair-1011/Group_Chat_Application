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

class Users {
  constructor(name, email, phoneNumber, password) {
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
    
  }
  async addUser() {
    return await users.create({
        name:this.name,
        email:this.email,
        phoneNumber:this.phoneNumber,
        password:this.password
    })
  }
}

module.exports = { users, Users };
