const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");
const uuid = require("uuid");

async function createFood(req, res) {
  //   console.log(req.foodPartner);
  //   console.log(req.body);
  //   console.log(req.file);
  const fileUploadResult = await storageService.uploadFile(
    req.file.buffer,
    uuid.v4()
  );

  const foodItem = await foodModel.create({
    name: req.body.name,
    video: fileUploadResult.url,
    description: req.body.description,
    foodPartner: req.foodPartner._id,
  });

  //   console.log(fileUploadResult.url);

  res.status(201).json({
    message: "Food Item Created",
    foodItem: foodItem,
  });
}

async function getFoodItems(req, res) {
  const foodItems = await foodModel.find({});

  res.status(200).json({
    message: "List of all the food items will show here",
    foodItems,
  });
}

module.exports = {
  createFood,
  getFoodItems,
};
