const express= require("express")
const app= express();
const http=require("http");
const server=http.createServer(app)
const cors=require("cors");
const cookieParser=require("cookie-parser");
const {sequelize}=require("./database/connection");
const {Server}=require("socket.io");
const io=new Server(server,{
    cors:{
        origin:"*"
    }
});
let onlineUsers=[];
io.on("connection",(socket)=>{
    console.log("user connected");

    socket.on("online",(data)=>{
        let userName=data.name;
        let userId=data.userId;
        socket.userName=userName;
        socket.userId=userId;

        let user={
            userName,userId
        }

        let flag=false;
        for(let each of onlineUsers){
                if(each.userId==userId){
                    flag=true
                }
        }
        if(flag==false){
            onlineUsers.push(user);


        }
        io.emit("usersOnline",onlineUsers);



   

    })

    socket.on("joinGroup",(data)=>{
        console.log(data);
        if(data.admin===true){
            socket.join(data.groupId);
 

        }else{

            let addedUserSocket=io.sockets.sockets.get(data.socketId);            
            addedUserSocket.join(data.groupId);
        }

    });
    
    socket.on("message",(data)=>{
        console.log(data);
        socket.broadcast.to(data.groupId).emit("groupMessage",{message:data.message,name:data.profileName,gn:data.gn,groupId:data.groupId})
    })



 

    


    socket.on("disconnect",()=>{
        console.log("user disconnected");
        let userName=socket.userName;
        let userId=socket.userId;

        let index=0;
        for(let each of onlineUsers){
                if(each.userId==userId){
                    index=onlineUsers.indexOf(each);
                    onlineUsers.splice(index,1);
                    io.emit("usersOffline",onlineUsers);
                }
        }
        


        
        
    })
  })
  



app.use(cookieParser())
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({extended:false}))


module.exports=io

//models
const {users}=require("./models/users");
const {messages}=require("./models/messages");
const {groups}=require("./models/groups");

messages.belongsTo(users);
users.hasMany(messages);
 
messages.belongsTo(groups);
groups.hasMany(messages);

users.hasMany(groups,{foreignKey:"groupAdmin"}); 
groups.belongsTo(users,{foreignKey:"groupAdmin"}); 

users.belongsToMany(groups, { through: 'userGroups' });
groups.belongsToMany(users, { through: 'userGroups' });

const user=require("./routes/users");
const message=require("./routes/messages");
const group=require("./routes/groups.js");




app.get("/",(req,res)=>{
 res.send("Api started")
})



app.use(user);
app.use(message);
app.use(group)


sequelize.sync({force:false})
.then(()=>{
    server.listen(3000,()=>{
        console.log("Api server running on port 3000")
    })
})
    

