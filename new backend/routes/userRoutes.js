const express = require("express");
const router = express.Router();
const {newUser,matchUser} = require("../controller/userController");


router.post("/register",newUser);
router.post("/signin",matchUser)

module.exports = router;