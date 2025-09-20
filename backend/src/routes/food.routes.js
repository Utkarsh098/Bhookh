const express = require("express");
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

//GET /api/food/ [protected]
router.get("/", authMiddleware.authUserMiddleware, foodController.getFoodItems);

//POST /api/food/ [protected only food partners]
router.post(
  "/",
  authMiddleware.authFoodPartnerMiddleware,
  upload.single("video"),
  foodController.createFood
);

//POST /api/food/like [protected]
router.post(
  "/like",
  authMiddleware.authUserMiddleware,
  foodController.likeFood
);

//POST /api/food/save [protected]
router.post(
  "/save",
  authMiddleware.authUserMiddleware,
  foodController.saveFood
);

router.get(
  "/saved",
  authMiddleware.authUserMiddleware,
  foodController.getSavedFood
);

module.exports = router;
