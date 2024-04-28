// library imports
const express = require("express");
const router = express.Router();

// controller imports
const signup = require("./signup");
const login = require('./login')

// validator imports
const signupValidator = require("./validators/signupValidator");
const loginValidator = require("./validators/loginValidator");
const forgotPasswordValidator = require("./validators/forgotPasswordValidator");

router.post("/signup", signupValidator, signup);
router.post("/login", loginValidator, login);
router.post("/forgotPassword", forgotPasswordValidator, login);

module.exports = router;
