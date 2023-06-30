window.addEventListener("DOMContentLoaded",()=>{
    
let registerForm=document.querySelector("#registerForm");
let loginForm= document.querySelector("#loginForm");
let registerSubmitBtn=document.querySelector("#registerSubmitBtn");
let loginSubmitBtn=document.querySelector("#loginSubmitBtn");

let register=document.querySelector("#register");
register.style.color="red";
register.style.backgroundColor="rgba(156, 153, 153, 0.514)";

let login= document.querySelector("#login");

register.addEventListener("click",(e)=>{
    e.preventDefault();

loginForm.style.display="none";
registerForm.style.display="flex";
register.style.color="red";
register.style.backgroundColor="rgba(156, 153, 153, 0.514)";
login.style.backgroundColor="initial"
login.style.color="initial";



});
login.addEventListener("click",(e)=>{
    e.preventDefault();
    loginForm.style.display="flex";
registerForm.style.display="none";
login.style.color="red";
login.style.backgroundColor="rgba(156, 153, 153, 0.514)"
register.style.color="initial";
register.style.backgroundColor="initial"


})

registerSubmitBtn.addEventListener("click",(e)=>{
    e.preventDefault();
loginForm.style.display="flex";
registerForm.style.display="none"

})

loginSubmitBtn.addEventListener("click",(e)=>{
    alert("logged in")
})















})
