async function sendMessage(message,token){
  return await axios.post('http://localhost:3000/api/send-message',{message},{headers:{authorization:token}});
}
async function getMessages(token){
 return await axios.get("http://localhost:3000/api/get-messages",{headers:{authorization:token}});
}

window.addEventListener("DOMContentLoaded",async()=>{

let messageInput=document.querySelector("#messageInput");
let messageSubmitBtn=document.querySelector("#messageSubmitBtn");
let token=localStorage.getItem("token") || sessionStorage.getItem("token") ;

let allMessages=document.querySelector("#allMessages");

getMessages(token)
.then((res)=>{
  allMessages.innerHTML="";
  
  let messages=res.data.messages;

  

  for (let each of messages){
    let p=document.createElement("p");
    let message=document.createTextNode(each);
    p.setAttribute("class","messages")
    p.appendChild(message);
    allMessages.appendChild(p);


  }
}).catch((err)=>{
  console.log(err)
})



messageInput.addEventListener("click",(e)=>{
  messageInput.style.border="";
  messageInput.style.fontSize="14px";
  messageInput.style.letterSpacing="0";
})


messageSubmitBtn.addEventListener("click",async (e)=>{
    e.preventDefault()
    if(messageInput.value!=""){
  
    sendMessage(messageInput.value,token)
    .then((res)=>{
      messageInput.value="";
      getMessages(token)
.then((res)=>{
  allMessages.innerHTML=""
  let messages=res.data.messages;
  

  for (let each of messages){
    let p=document.createElement("p");
    let message=document.createTextNode(each);
    p.setAttribute("class","messages")
    p.appendChild(message);
    allMessages.appendChild(p);


  }
}).catch((err)=>{
  console.log(err)
})
      
    })
    .catch((err)=>{

    })
    
    }else{
      messageInput.style.border="2px solid red";
      messageInput.style.textAlign="center";
      messageInput.style.fontSize="14px";
      messageInput.style.letterSpacing="10px";
      
  
 }
})



})