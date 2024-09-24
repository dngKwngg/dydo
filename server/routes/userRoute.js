const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
router.use(authController.authenticateToken);
router.post("/addUser", userController.addUser);
router.post("/deleteUser", userController.DeleteUser);
module.exports = router;
