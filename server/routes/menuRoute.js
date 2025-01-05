import express from "express";
import menuController from "../controllers/menuController.js";
import authController from "../controllers/authController.js";

const router = express.Router();

router.use(authController.authenticateToken);
router.post("/updateInfoMenu", menuController.updateInfoMenu);
router.post("/addMenuItem", menuController.addMenuItem);
router.post("/deleteMenuItem", menuController.deleteMenuItem);
router.get("/listFood", menuController.listFood);
router.get("/listDrink", menuController.listDrink);
router.post("/listFoodById", menuController.listFoodById);
router.get("/listMenu", menuController.listMenu);
router.get("/highlightMenu", menuController.getHighlightMenu);

export default router;