async function addUser(newUser) {
  return await axios.post("http://localhost:3000/api/add-user", newUser);
}

window.addEventListener("DOMContentLoaded", () => {
  let register = document.querySelector("#register");
  let login = document.querySelector("#login");

  let registerForm = document.querySelector("#registerForm");
  let loginForm = document.querySelector("#loginForm");
  let registerSubmitBtn = document.querySelector("#registerSubmitBtn");
  let loginSubmitBtn = document.querySelector("#loginSubmitBtn");

  register.style.color = "red";
  register.style.backgroundColor = "rgba(156, 153, 153, 0.514)";

  let inputDivWrap = document.querySelectorAll(".label_inputWrap");

  let nameInput = document.querySelector("#name");
  let emailInput = document.querySelector("#email");
  let phoneNumberInput = document.querySelector("#phoneNumber");
  let passwordInput = document.querySelector("#password");

  register.addEventListener("click", (e) => {
    e.preventDefault();

    loginForm.style.display = "none";
    registerForm.style.display = "flex";
    register.style.color = "red";
    register.style.backgroundColor = "rgba(156, 153, 153, 0.514)";
    login.style.backgroundColor = "initial";
    login.style.color = "initial";
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
                  each.children[1].addEventListener("click",()=>{
                    each.children[1].value="";
                  })
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

  loginSubmitBtn.addEventListener("click", (e) => {
    alert("logged in");
  });
});
