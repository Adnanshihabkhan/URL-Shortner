const express = require("express");
const router = express.Router();
const {
  handleUserSignUpUser,
  handleUserLoginUser,
} = require("../controllers/user");

router.post("/", handleUserSignUpUser);
router.post("/login", handleUserLoginUser);

module.exports = router;
