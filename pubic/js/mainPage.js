async function sendMessage(message,token){
  return await axios.post('http://localhost:3000/api/send-message',{message},{headers:{authorization:token}})
}

window.addEventListener("DOMContentLoaded",async()=>{

let messageInput=document.querySelector("#messageInput");
let messageSubmitBtn=document.querySelector("#messageSubmitBtn");

messageInput.addEventListener("click",(e)=>{
  messageInput.style.border="";
  messageInput.style.fontSize="14px";
  messageInput.style.letterSpacing="0";
})


messageSubmitBtn.addEventListener("click",async (e)=>{
    e.preventDefault()
    if(messageInput.value!=""){
      let token=localStorage.getItem("token") || sessionStorage.getItem("token")     ;
  
    sendMessage(messageInput.value,token)
    .then((res)=>{
      messageInput.value=""
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