const express = require("express");
const { register, login, getAuthState } = require("../controllers/auth");
const router = express.Router();

router.route("/").get(getAuthState);

router.route("/register").post(register);

router.route("/login").post(login);

module.exports = router;