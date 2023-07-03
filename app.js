const express= require("express")
const app= express();
const cors=require("cors");
const {sequelize}=require("./database/connection");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}))

const users=require("./routes/users")

app.get("/",(req,res)=>{
 res.send("Api started")
})
app.use(users);

sequelize.sync()
.then(()=>{
    app.listen(3000,()=>{
        console.log("Api server running on port 3000")
    })
})
    
    
