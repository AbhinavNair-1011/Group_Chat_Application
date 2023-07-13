const { users } = require("../models/users");

const addUser = async (req, res, next) => {
  let name = req.body.name;
  let email = req.body.email;
  let phoneNumber = parseInt(req.body.phoneNumber);
  let password = req.hashedPassword;

  try {
    users.create({
      name,
      email,
      phoneNumber,
      password,
    });
    return res.status(200).json({
      status: "success",
      message: "user registered successfully",
    });
  } catch (err) {
    let errorName = err.name;
    let fields = err.errors[0].path;
    let value = err.errors[0].value;

    if ((errorName = "SequelizeUniqueConstraintError")) {
      return res.status(404).json({
        status: "failed",
        message: "duplicate entry",
        errorType: fields,
        errorValue: value,
      });
    }
  }
};

async function validateUser(req, res, next) {
  if (req.userFound) {
    if (req.passwordMatched) {
      

      return res.status(200).json({
          userFound: req.userFound,
          passwordMatched: req.passwordMatched,
          message: req.message,
          status: req.status,
          t:req.userDetail
        });
    } else {
      return res.status(200).json({
        userFound: req.userFound,
        passwordMatched: req.passwordMatched,
        message: req.message,
        status: req.status,
      });
    }
  } else {
    res.status(404).json({
      userFound: req.userFound,
      message: req.message,
      status: req.status,
    });
  }
}
module.exports = { addUser, validateUser };
