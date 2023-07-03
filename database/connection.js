const Sequelize=require("sequelize").Sequelize;
const sequelize= new Sequelize("group_chat","root","Abhinav@1011",{
    dialect:"mysql",
    host:"localhost"
});

sequelize.authenticate()
.then(()=>{
    console.log("Connected to database group_chat on port 3306")
})
.catch((err)=>{
    console.log(err)
})

module.exports={sequelize};