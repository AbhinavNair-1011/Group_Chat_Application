async function sendMessage(message, token, socketId, groupId) {
  return await axios.post(
    "http://localhost:3000/api/send-message",
    { message, socketId, groupId },
    { headers: { authorization: token } }
  );
}
async function getMessages(token, groupId) {
  return await axios.get(`http://localhost:3000/api/get-messages/${groupId}`, {
    headers: { authorization: token },
  });
}
async function userDetails(token) {
  return await axios.get("http://localhost:3000/api/user-details", {
    headers: { authorization: token },
  });
}
async function addGroup(groupName, token) {
  return await axios.post("http://localhost:3000/api/add-group", groupName, {
    headers: { authorization: token },
  });
}
async function getGroups(token) {
  return await axios.get("http://localhost:3000/api/get-groups", {
    headers: { authorization: token },
  });
}
async function addUserToGroup(groupId, userId, gn, token) {
  return await axios.post(
    "http://localhost:3000/api/add-user-group",
    { groupId, userId, gn },
    { headers: { authorization: token } }
  );
}
async function updateSocketId(token, socketId) {
  return await axios.put(
    "http://localhost:3000/api/update-socket",
    { socketId },
    { headers: { authorization: token } }
  );
}
window.addEventListener("DOMContentLoaded", async () => {

  if(localStorage.getItem("token")==null){
    window.location.href="../views/index.html"
  }
  let token = localStorage.getItem("token") || sessionStorage.getItem("token");

  let socketId;
  let profileName;
  let socket = io("http://localhost:3000");

  socket.on("connect", () => {
    console.log("connected");
    socketId = socket.id;
    updateSocketId(token, socket.id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });


      userDetails(token).then((res) => {
        let name = res.data.userName;
        let userId=res.data.userId;
    
        profileName = name;
        userName.innerText = `Logged in : ${name} `;

        socket.emit("online", {name,userId});
      });


    let keys = [];
    let values = [];
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i) == "token") {
       } else {
        keys.push(localStorage.key(i));
      }
    }
    for (let i = 0; i < keys.length; i++) {
      values.push(localStorage.getItem(keys[i]));
    }

    for (let each of values) {
      socket.emit("joinGroup", { admin: true, groupId: each });
    }
  });


  window.addEventListener("orientationchange",()=>{
    location.reload();
  })

  let messageBlock = document.querySelector("#messageBlock");
  let groups = document.querySelector("#groups");
  let groupsDiv=document.querySelector("#groupsDiv")
  let newGroup = document.querySelector("#newGroup");
  let newGroupForm = document.querySelector("#newGroupForm");
  let groupName = document.querySelector("#groupName");
  let groupNameCancel = document.querySelector("#groupNameCancel");
  let selectedGroupName = document.querySelector("#selectedGroupName");
  let selectGroupDiv=document.querySelector("#selectedGroupDiv")
  let groupNameSubmit = document.querySelector("#groupNameSubmit");
  let addMember = document.querySelector("#addMember");
  let addMemberForm = document.querySelector("#addMemberForm");
  let addMemberCancel = document.querySelector("#addMemberCancel");
  let addMemberSubmit = document.querySelector("#addMemberSubmit");
  let addMemberId = document.querySelector("#addMemberId");
  addMemberId.value=""; 
  let onlineUsers=document.querySelector("#onlineUsers");
let usersDiv=document.querySelector("#usersDiv");

  let messageInput = document.querySelector("#messageInput");
  let messageSubmitBtn = document.querySelector("#messageSubmitBtn");

  let allMessages = document.querySelector("#allMessages");
  let userName = document.querySelector("#userName");

  let clickedGroup = { clicked: false, groupId: "" };

  

  messageInput.addEventListener("click", (e) => {
    messageInput.style.border = "";
    messageInput.style.fontSize = "14px";
    messageInput.style.letterSpacing = "0";
  });

  messageSubmitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    if (messageInput.value != "") {
      let gn =
        messageInput.parentElement.parentElement.children[0].children[0]
          .innerHTML;
      let groupId = localStorage.getItem(gn);
      let message = messageInput.value;

      let div = document.createElement("li");
      let p = document.createElement("p");
      let p2 = document.createElement("p");
      p2.innerText = profileName;

      let messageText = document.createTextNode(message);
      p.setAttribute("class", "messages");
      p2.setAttribute("class", "userName");
      div.setAttribute("class", "messageWrap");
      p.appendChild(messageText);
      div.appendChild(p2);
      div.appendChild(p);
      allMessages.appendChild(div);

      socket.emit("message", { groupId, gn, message, profileName });

      sendMessage(message, token, socketId, groupId)
        .then((res) => {
          messageInput.value = "";
          allMessages.lastElementChild.scrollIntoView({behavior:"instant",block:"end"})
        })
        .catch((err) => {});
    } else {
      messageInput.style.border = "2px solid red";
      messageInput.style.textAlign = "center";
      messageInput.style.fontSize = "14px";
      messageInput.style.letterSpacing = "10px";
    }
  });

  newGroup.addEventListener("click", (e) => {
    e.preventDefault();
    newGroupForm.style.display = "flex";
    messageBlock.style.visibility = "hidden";
  });

  groupNameCancel.addEventListener("click", (e) => {
    e.preventDefault();
    newGroupForm.style.display = "none";
    // messageBlock.style.visibility = "visible";
  });

  groupNameSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    let group = document.createElement("li");
    group.setAttribute("class", "groups");
    if (groupName.value != "") {
      group.innerText = groupName.value;
      let p = document.createElement("p");
      p.setAttribute("class", "incomingMessages");

      p.innerText = "";

      newGroupForm.style.display = "none";
      addGroup({ groupName: groupName.value, socketId, admin: true }, token)
        .then((res) => {
          p.setAttribute("id", `p${res.data.id}`);

          groups.appendChild(p);
          groups.appendChild(group);

          group.setAttribute("id", res.data.id);
          localStorage.setItem(res.data.name, res.data.id);
          socket.emit("joinGroup", { groupId: res.data.id, admin: true });
          let flag;
          for (let each of groups.children) {
            each.addEventListener("click", (e) => {
              let name = each.childNodes[0].textContent;
              each.style.backgroundColor = "rgba(4, 54, 54, 0.664)";
              selectedGroupName.innerText = name;
              messageBlock.style.visibility = "visible";
              if(window.innerWidth<1000){
                groupsDiv.style.display="none"

              }
              let gd = localStorage.getItem(name);

              let p=document.getElementById(`p${gd}`);
              p.innerHTML="";
              p.style.visibility="hidden";
              localStorage.removeItem(gd);

              getMessages(token, gd)
                .then((res) => {
                  allMessages.innerHTML = "";

                  let messages = res.data.messages;

                  for (let each of messages) {
                    let div = document.createElement("li");
                    let p = document.createElement("p");
                    let p2 = document.createElement("p");
                    p2.innerText = each.userName;

                    let message = document.createTextNode(each.userMessage);
                    p.setAttribute("class", "messages");
                    p2.setAttribute("class", "userName");
                    div.setAttribute("class", "messageWrap");
                    p.appendChild(message);
                    div.appendChild(p2);
                    div.appendChild(p);
                    allMessages.appendChild(div);
                  }
                  allMessages.scrollIntoView({behavior:"smooth",block:"end"})

                })
                .catch((err) => {});

              for (let notSelected of groups.children) {
                if (notSelected.innerText != each.innerText) {
                  notSelected.style.backgroundColor =
                    "rgba(0, 255, 255, 0.329)";
                }
              }
            });

            if (each.innerText == res.data.name) {
              flag = each.innerText;
            }
          }

          for (let each of groups.children) {
            if (each.innerText == flag) {
              each.click();
              let id = each.getAttribute("id");
              clickedGroup.clicked = true;
              clickedGroup.groupId = id;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });

      groupName.value = "";
    }
  });

  getGroups(token)
    .then((res) => {
      let groupNames = res.data.groupNames;

      if (groupNames.length != 0) {
        for (let each of groupNames) {
          localStorage.setItem(each.name, each.id);

          let group = document.createElement("li");
          group.setAttribute("class", "groups");
          group.setAttribute("id", each.id);
          group.innerText = each.name;

          let p = document.createElement("p");
          p.setAttribute("class", "incomingMessages");
          p.setAttribute("id", `p${each.id}`);

          p.innerText = "";
          group.appendChild(p);
          groups.appendChild(group);
          localStorage.setItem(each.name, each.id);
        }
        if (groups.children.length == 0) {
          messageBlock.style.visibility = "hidden";
          newGroupForm.style.display = "flex";
        } else {
          newGroupForm.style.display = "none";

          for (let each of groups.children) {
            each.addEventListener("click", (e) => {
              let name = each.childNodes[0].textContent;
              each.style.backgroundColor = "rgba(4, 54, 54, 0.664)";
              selectedGroupName.innerText = name;
              messageBlock.style.visibility = "visible";
              messageBlock.style.display="flex";
              if(window.innerWidth<1000){
                groupsDiv.style.display="none"

              }

              let groupId = localStorage.getItem(name);


              let p=document.getElementById(`p${groupId}`);
              p.innerHTML="";
              p.style.visibility="hidden";
              localStorage.removeItem(groupId);


              clickedGroup.clicked = true;
              clickedGroup.groupId = groupId;

              getMessages(token, groupId)
                .then((res) => {
                  allMessages.innerHTML = "";

                  let messages = res.data.messages;

                  for (let each of messages) {
                    let div = document.createElement("li");
                    let p = document.createElement("p");
                    let p2 = document.createElement("p");
                    p2.innerText = each.userName;

                    let message = document.createTextNode(each.userMessage);
                    p.setAttribute("class", "messages");
                    p2.setAttribute("class", "userName");
                    div.setAttribute("class", "messageWrap");
                    p.appendChild(message);
                    div.appendChild(p2);
                    div.appendChild(p);
                    allMessages.appendChild(div);
                  }
                  allMessages.lastElementChild.scrollIntoView({behavior:"instant",block:"end"})

                })
                .catch((err) => {});

              for (let notSelected of groups.children) {
                if (notSelected.innerText != each.innerText) {
                  notSelected.style.backgroundColor =
                    "rgba(0, 255, 255, 0.329)";
                }
              }
            });

          }
          for(let each of groups.children){
            let id=each.getAttribute("id");
            let p=document.getElementById(`p${id}`);
            let ls=localStorage.getItem(id);
            if(ls!=null){
              p.style.visibility="visible";
              p.innerText=ls
            }
          }
          // groups.children[0].click()

        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
  let groupId = "";
  let gn = "";
  addMember.addEventListener("click", (e) => {
    e.preventDefault();
    addMemberForm.style.visibility = "visible";
    addMemberForm.style.height = "160px";
    addMemberForm.style.opacity = 1;

    gn = addMember.parentElement.children[0].innerHTML;

    groupId = localStorage.getItem(gn);
  });

  addMemberSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    if (addMemberId.value != "") {
      addMemberId.style.border="1px solid blue"

      let userId = addMemberId.value;
      
      addUserToGroup(groupId, userId, gn, token)
        .then((res) => {
          let socketId = res.data.socketId;
          socket.emit("joinGroup", {
            admin: false,
            socketId: socketId,
            groupId: groupId,
          });
          let addedUserName = res.data.name;
          let p = document.createElement("p");
          p.setAttribute("class", "joined");
          p.innerText = `${addedUserName} joined `;
          allMessages.appendChild(p);
          addMemberId.value=""; 
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data.message == "user already in group") {
            addMemberId.value=""; 
            alert("User already in group");
          }
        });
    }else{
      addMemberId.style.border="2px solid red"
    }
  });

  addMemberCancel.addEventListener("click", (e) => {
    e.preventDefault();
    addMemberForm.style.visibility = "hidden";
    addMemberForm.style.height = "0px";
    addMemberForm.style.opacity = 0;
    addMemberId.value=""; 

  });

  let count = { groupId: "", number: 0 };

  socket.on("groupMessage", (data) => {
    let groupId = data.groupId;
    let name = data.name;
    let message = data.message;
    let groupName = data.gn;


    for (let each of groups.children) {
      let id = each.getAttribute("id");

      if (groupId == id && clickedGroup.groupId == id) {
        

        let div = document.createElement("li");
        let p = document.createElement("p");
        let p2 = document.createElement("p");
        p2.innerText = name;

        let messageText = document.createTextNode(message);
        p.setAttribute("class", "messages");
        p2.setAttribute("class", "userName");
        div.setAttribute("class", "messageWrap");
        p.appendChild(messageText);
        div.appendChild(p2);
        div.appendChild(p);
        allMessages.appendChild(div);
      }
      allMessages.lastElementChild.scrollIntoView({behavior:"instant",block:"end"})

      if (groupId == id && clickedGroup.groupId != id) {

        let p=document.getElementById(`p${groupId}`);
        p.style.visibility="visible"

        if (localStorage.getItem(groupId) != null) {
          let value = localStorage.getItem(groupId);
          value++;
          p.innerHTML=value;
          localStorage.setItem(groupId, value);
        } else if (count.groupId == id) {
          count.number++;
          p.innerHTML=count.number;
          localStorage.setItem(groupId, count.number);
        } else {
          count.groupId = id;
          count.number = 1;
          p.innerHTML=count.number;
          localStorage.setItem(count.groupId, count.number);
        }
      }
    }
  });




socket.on("usersOnline",(data)=>{
  console.log(data)
  for(let each of data){


    let userName=each.userName;
    let userId=each.userId;
    let div=document.createElement("div");
    let li=document.createElement("li");
    let li2=document.createElement("li");
  
  
    div.setAttribute("id",`div${userId}`)
    li.setAttribute("class","userNames")
    li.setAttribute("id",userName)
    li.innerText=userName;
    li2.setAttribute("class","userIds");
    li2.setAttribute("id",`p${userId}`)
    li2.innerText=userId;
    li2.style.display="none"
  
    let flag=false;
    for(let each of onlineUsers.children){
      
      let id=each.getAttribute("id");
      if(id==`div${userId}`){
  flag=true;
  
      }
    }
    if(flag==false){
    div.appendChild(li);
    div.appendChild(li2);
    onlineUsers.appendChild(div);

    div.addEventListener("click",(e)=>{
      div.children[1].style.display="initial";
      setTimeout(()=>{
        div.children[1].style.display="none";

      },5000)
    })
    }
    
  }



})
socket.on("usersOffline",(data)=>{
  onlineUsers.innerHTML=`<li id="online">Online Users</li>
  <li id="info">Click username to get the userId</li>`;
  
  for(let each of data){


    let userName=each.userName;
    let userId=each.userId;
    let div=document.createElement("div");
    let li=document.createElement("li");
    let li2=document.createElement("li");
  
  
    div.setAttribute("id",`div${userId}`)
    li.setAttribute("class","userNames")
    li.setAttribute("id",userName)
    li.innerText=userName;
    li2.setAttribute("class","userIds");
    li2.setAttribute("id",`p${userId}`)
    li2.innerText=userId;
    li2.style.display="none"
  
  
   
    div.appendChild(li);
    div.appendChild(li2);
    onlineUsers.appendChild(div);

    div.addEventListener("click",(e)=>{
      div.children[1].style.display="initial";
      setTimeout(()=>{
        div.children[1].style.display="none";

      },5000)
    })
    
    
  }



})

socket.on("userOffline",(data)=>{
  let userName=data.userName;
  let userId=data.userId;
  for(let each of onlineUsers.children){
    
  }

})

if(window.innerWidth<1000){
 messageBlock.style.display="none";
 let button=document.createElement("button");
 button.innerText="<";
 button.setAttribute("id","backButton")
 selectGroupDiv.prepend(button);

 button.addEventListener("click",(e)=>{
  e.preventDefault();
  messageBlock.style.display="none";
  groupsDiv.style.display="initial"
  
})




}else{
  messageBlock.style.display="flex";
  usersDiv.style.display="initial";
}

  

});
