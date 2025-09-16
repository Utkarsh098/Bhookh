const foodParterModel = require("../models/foodPartner.model");

async function getFoodPartnerByID(req, res) {
  const foodPartnerId = req.params.id;

  const foodPartner = await foodParterModel.findById(foodPartnerId);

  if (!foodPartner) {
    res.status(404).json({ message: "Food Partner not found" });
  }

  res.status(200).json({
    message: "Food partner details fetched successfully:",
    foodPartner,
  });
}

module.exports = {
  getFoodPartnerByID,
};
