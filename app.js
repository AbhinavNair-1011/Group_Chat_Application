const express= require("express")
const app= express();
const cors=require("cors");
const cookieParser=require("cookie-parser");
const {sequelize}=require("./database/connection");

app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:"http://127.0.0.1:5500"
}));

app.use(express.json());
app.use(express.urlencoded({extended:false}))

//models
const {users}=require("./models/users");
const {messages}=require("./models/messages");

messages.belongsTo(users);
users.hasMany(messages);

const user=require("./routes/users");
const message=require("./routes/messages");




app.get("/",(req,res)=>{
 res.send("Api started")
})



app.use(user);
app.use(message);

sequelize.sync()
.then(()=>{
    app.listen(3000,()=>{
        console.log("Api server running on port 3000")
    })
})
    
    
