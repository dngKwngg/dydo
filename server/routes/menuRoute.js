const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");
router.post("/updatePrice", menuController.updatePrice);
router.post("/addMenuItem", menuController.addMenuItem);
module.exports = router;    
