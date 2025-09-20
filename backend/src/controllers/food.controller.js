const foodModel = require("../models/food.model");
const likeModel = require("../models/likes.model");
const saveModel = require("../models/saves.model");
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

async function likeFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadyLiked = await likeModel.findOne({
    user: user._id,
    food: foodId,
  });

  if (isAlreadyLiked) {
    await likeModel.deleteOne({
      user: user._id,
      food: foodId,
    });
    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { likeCount: -1 },
    });

    return res.status(200).json({
      message: "Food unliked successfully",
    });
  }

  const like = await likeModel.create({
    user: user._id,
    food: foodId,
  });

  await foodModel.findByIdAndUpdate(foodId, {
    $inc: { likeCount: 1 },
  });

  return res.status(200).json({
    message: "Food Liked successfully",
    like,
  });
}

async function saveFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isSavedAlready = await saveModel.findOne({
    food: foodId,
    user: user._id,
  });

  if (isSavedAlready) {
    await saveModel.deleteOne({
      food: foodId,
      user: user._id,
    });

    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { savesCount: -1 },
    });

    return res.status(200).json({
      message: "food Unsaved successfully",
    });
  }

  const save = await saveModel.create({
    user: user._id,
    food: foodId,
  });

  await foodModel.findByIdAndUpdate(foodId, {
    $inc: { savesCount: 1 },
  });

  return res.status(200).json({
    message: "Food Saved successfully",
    save,
  });
}

async function getSavedFood(req, res) {
  const user = req.user;
  const savedItems = await saveModel.find({
    user: user._id,
  }).populate('food');

  if (!savedItems || savedItems === 0) {
    res.status(404).json({
      message: "No saved food items found",
    });
  }

  res.status(200).json({
    message: "Saved items fetched successfully",
    savedItems,
  });
}

module.exports = {
  createFood,
  getFoodItems,
  likeFood,
  saveFood,
  getSavedFood,
};
