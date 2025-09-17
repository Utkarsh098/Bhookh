const foodModel = require("../models/food.model");
const foodParterModel = require("../models/foodPartner.model");

async function getFoodPartnerByID(req, res) {
  const foodPartnerId = req.params.id;

  const foodPartner = await foodParterModel.findById(foodPartnerId);
  const foodItemsByFoodPartner = await foodModel.find({
    foodPartner: foodPartnerId,
  });

  if (!foodPartner) {
    res.status(404).json({ message: "Food Partner not found" });
  }

  res.status(200).json({
    message: "Food partner details fetched successfully:",
    foodPartner: {
      ...foodPartner.toObject(),
      foodItems: foodItemsByFoodPartner,
    },
  });
}

module.exports = {
  getFoodPartnerByID,
};
