const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");
// const authController = require("../controllers/authController");
// router.use(authController.authenticateToken);
router.post("/updatePrice", menuController.updatePrice);
router.post("/addMenuItem", menuController.addMenuItem);
router.post("/deleteMenuItem", menuController.deleteMenuItem);
router.get("/listFood", menuController.listFood);
router.get("/listDrink", menuController.listDrink);
router.post("/listFoodById", menuController.listFoodById);

module.exports = router;
