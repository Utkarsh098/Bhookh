const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const foodPartnerController = require("../controllers/food-partner.controller");
const router = express.router();

//GET /api/food-partner/:id
router.get(
  "/:id",
  authMiddleware.authFoodPartnerMiddleware,
  foodPartnerController.getFoodPartnerByID
);

module.exports = router;
