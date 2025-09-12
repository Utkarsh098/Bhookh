const foodParterModel = require("../models/foodPartner.model");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function authUserMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Please login first",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    req.user = user;

    next();
    
  } catch (err) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
}

async function authFoodPartnerMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Please login first",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const foodPartner = await foodParterModel.findById(decoded.id);

    req.foodPartner = foodPartner;
    next();
  } catch (err) {
    res.status(401).json({
      message: `${err.message}\n This usually happens due to invalid token, please login again.`,
    });
  }
}

module.exports = {
  authFoodPartnerMiddleware,
  authUserMiddleware,
};
