async function addUser(newUser) {
  return await axios.post("http://localhost:3000/api/add-user", newUser);
}
async function validateUser(userDetails) {
  return await axios.post(
    "http://localhost:3000/api/validate-user",
    userDetails
  );
}

window.addEventListener("DOMContentLoaded", () => {
  let register = document.querySelector("#register");
  let login = document.querySelector("#login");
  let signUp = document.querySelector("#signUp");

  let registerForm = document.querySelector("#registerForm");
  let loginForm = document.querySelector("#loginForm");
  let registerSubmitBtn = document.querySelector("#registerSubmitBtn");
  let loginSubmitBtn = document.querySelector("#loginSubmitBtn");

  login.style.color = "red";
  login.style.backgroundColor = "rgba(156, 153, 153, 0.514)";

  let inputDivWrap = document.querySelectorAll(".label_inputWrap");

  let nameInput = document.querySelector("#name");
  let emailInput = document.querySelector("#email");
  let phoneNumberInput = document.querySelector("#phoneNumber");
  let passwordInput = document.querySelector("#password");

  let loginEmailInput = document.querySelector("#loginEmail");
  let loginPasswordInput = document.querySelector("#loginPassword");

  //register form

  register.addEventListener("click", (e) => {
    e.preventDefault();

    loginForm.style.display = "none";
    registerForm.style.display = "flex";
    register.style.color = "red";
    register.style.backgroundColor = "rgba(156, 153, 153, 0.514)";
    login.style.backgroundColor = "initial";
    login.style.color = "initial";

    nameInput.value = "";
    emailInput.value = "";
    phoneNumberInput.value = "";
    passwordInput.value = "";
  });
  signUp.addEventListener("click", (e) => {
    e.preventDefault();

    loginForm.style.display = "none";
    registerForm.style.display = "flex";
    register.style.color = "red";
    register.style.backgroundColor = "rgba(156, 153, 153, 0.514)";
    login.style.backgroundColor = "initial";
    login.style.color = "initial";

    nameInput.value = "";
    emailInput.value = "";
    phoneNumberInput.value = "";
    passwordInput.value = "";
  });
  login.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.style.display = "flex";
    registerForm.style.display = "none";
    login.style.color = "red";
    login.style.backgroundColor = "rgba(156, 153, 153, 0.514)";
    register.style.color = "initial";
    register.style.backgroundColor = "initial";
  });

  registerSubmitBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    let name = nameInput.value;
    let email = emailInput.value;
    let phoneNumber = phoneNumberInput.value;
    let password = passwordInput.value;

    let newUser = {
      name,
      email,
      phoneNumber,
      password,
    };
    let userInputCheck = {
      inputBlank: false,
      missingType: [],
      enteredType: [],
    };
    for (let prop in newUser) {
      if (newUser[prop] === "") {
        userInputCheck.inputBlank = true;
        userInputCheck.missingType.push(prop);
      } else {
        userInputCheck.enteredType.push(prop);
      }
    }

    if (userInputCheck.inputBlank === false) {
      for (let element of userInputCheck.enteredType) {
        for (let each of inputDivWrap) {
          if (each.children[1] === undefined) {
            continue;
          } else {
            if (each.children[1].attributes[1].value === element) {
              if (each.nextElementSibling.className == "valueRequired") {
                each.parentElement.removeChild(each.nextElementSibling);
              }
            }
          }
        }
      }
      try {
        let responce = await addUser(newUser);

        nameInput.value = "";
        emailInput.value = "";
        phoneNumberInput.value = "";
        passwordInput.value = "";
        loginForm.style.display = "flex";
        registerForm.style.display = "none";
        login.click();
      } catch (err) {
        if (err) {
          if (
            err.response.data.status == "failed" &&
            err.response.data.message == "duplicate entry"
          ) {
            for (let each of inputDivWrap) {
              if (each.children[1] === undefined) {
                continue;
              } else if (
                each.children[1].attributes[1].value ===
                err.response.data.errorType
              ) {
                let p = document.createElement("p");
                p.appendChild(
                  document.createTextNode(
                    `${err.response.data.errorType} already exists`
                  )
                );
                p.setAttribute("class", "valueRequired");
                if (each.nextElementSibling.className != "valueRequired") {
                  each.parentElement.insertBefore(p, each.nextElementSibling);
                  each.children[1].addEventListener("click", () => {
                    each.children[1].value = "";
                  });
                }
              }
            }
          }
        }
      }
    } else {
      for (let element of userInputCheck.missingType) {
        for (let each of inputDivWrap) {
          if (each.children[1] === undefined) {
            continue;
          } else {
            if (each.children[1].attributes[1].value === element) {
              let p = document.createElement("p");
              p.appendChild(document.createTextNode(`${element} is required`));
              p.setAttribute("class", "valueRequired");
              if (each.nextElementSibling.className != "valueRequired") {
                each.parentElement.insertBefore(p, each.nextElementSibling);
              } else {
                each.nextElementSibling.innerText = `${element} is required`;
              }
            }
          }
        }
      }
      for (let element of userInputCheck.enteredType) {
        for (let each of inputDivWrap) {
          if (each.children[1] === undefined) {
            continue;
          } else {
            if (each.children[1].attributes[1].value === element) {
              if (each.nextElementSibling.className == "valueRequired") {
                each.parentElement.removeChild(each.nextElementSibling);
              }
            }
          }
        }
      }
    }
  });

  loginSubmitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    let loginEmail = loginEmailInput.value;
    let loginPassword = loginPasswordInput.value;

    let userDetails = {
      email: loginEmail,
      password: loginPassword,
    };

    // let userInputCheck = {
    //   inputBlank: false,
    //   missingType: [],
    //   enteredType: [],
    // };
    // for (let prop in userDetails) {
    //   if (userDetails[prop] === "") {
    //     userInputCheck.inputBlank = true;
    //     userInputCheck.missingType.push(prop);
    //   } else {
    //     userInputCheck.enteredType.push(prop);
    //   }
    // }

    if (loginEmail || loginPassword) {
      if (loginEmail) {
        if (
          loginEmailInput.parentElement.nextElementSibling.className ==
          "valueRequired login"
        ) {
          loginForm.removeChild(
            loginEmailInput.parentElement.nextElementSibling
          );
        }
      }
      if (loginPassword) {
        if (
          loginPasswordInput.parentElement.nextElementSibling.className ==
          "valueRequired login"
        ) {
          loginForm.removeChild(
            loginPasswordInput.parentElement.nextElementSibling
          );
        }
      }
    }

    if (loginEmail == "" || loginPassword == "") {
      if (loginEmail == "") {
        let p = document.createElement("p");
        p.appendChild(document.createTextNode(`Email is required`));
        p.setAttribute("class", "valueRequired login");
        if (
          loginEmailInput.parentElement.nextElementSibling.className !=
          "valueRequired login"
        ) {
          loginForm.insertBefore(
            p,
            loginEmailInput.parentElement.nextElementSibling
          );
        }else{
            loginEmailInput.parentElement.nextElementSibling.innerText="Email is required"
        }
       
      }
      if (loginPassword == "") {
        let p = document.createElement("p");
        p.appendChild(document.createTextNode(`Password is required`));
        p.setAttribute("class", "valueRequired login");
        if (
          loginPasswordInput.parentElement.nextElementSibling.className !=
          "valueRequired login"
        ) {
          loginForm.insertBefore(
            p,
            loginPasswordInput.parentElement.nextElementSibling
          );
        }
      
      }
    }
    if (loginEmail && loginPassword) {
      try {
          let res=await validateUser(userDetails);

          let userFound=res.data.userFound;
          let passwordMatched=res.data.passwordMatched;

       if (userFound){
          if(!passwordMatched){
            
            let p = document.createElement("p");
            p.appendChild(document.createTextNode(`Password is incorrect`));
            p.setAttribute("class", "valueRequired login");
            if (
              loginPasswordInput.parentElement.nextElementSibling.className !=
              "valueRequired login"
            ) {
              loginForm.insertBefore(
                p,
                loginPasswordInput.parentElement.nextElementSibling
              );
            }
            
            
          }else{
              //  window.location.href="../views/mainPage.html";
          }
       }

      } catch (err) {
       
        let p = document.createElement("p");
        p.appendChild(document.createTextNode(`user not found`));
        p.setAttribute("class", "valueRequired login");
        if (
          loginEmailInput.parentElement.nextElementSibling.className !=
          "valueRequired login"
        ) {
         
          loginForm.insertBefore(p,loginEmailInput.parentElement.nextElementSibling)
        }else{
            loginEmailInput.parentElement.nextElementSibling.innerText="user not found"
        }
       
        
      }


    }
  });
});
