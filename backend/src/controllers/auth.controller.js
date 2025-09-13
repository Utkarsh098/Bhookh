const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodPartner.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  try {
    const { fullName, email, password } = req.body;
    const isUserAlreadyExists = await userModel.findOne({ email });

    if (isUserAlreadyExists) {
      return res.status(400).json({ message: "User already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET
    );

    res.cookie("token", token);

    res.status(201).json({
      message: "User registered Successfully",
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (err) {
    console.error("Error in registering a new user \n", err);
    res.status(500).json({ message: "Error Registering the User" });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    res.status(400).json({
      message: "Invalid Email, please try again.",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.status(400).json({
      message: "Incorrect Password, please try again.",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);
  res.status(200).json({
    message: "User logged in successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}

async function registerFoodPartner(req, res) {
  const { name, email, password, phone, address, contactName } = req.body;
  const isAccountAlreadyExists = await foodPartnerModel.findOne({ email });

  if (isAccountAlreadyExists) {
    res.status(400).json({ message: "Account already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const foodPartner = await foodPartnerModel.create({
    name,
    email,
    password: hashedPassword,
    phone,
    address,
    contactName,
  });

  const token = jwt.sign(
    {
      id: foodPartner._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);
  res.status(201).json({
    message: "Food Partner account created successfully",
    foodPartner: {
      _id: foodPartner._id,
      name: foodPartner.name,
      email: foodPartner.email,
      contactName: foodPartner.contactName,
      phone: foodPartner.phone,
      address: foodPartner.address,
    },
  });
}

async function loginFoodPartner(req, res) {
  const { email, password } = req.body;

  const foodPartner = await foodPartnerModel.findOne({ email });

  if (!foodPartner) {
    res.status(400).json({
      message: "Invalid Email, please try again.",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

  if (!isPasswordValid) {
    res.status(400).json({
      message: "Incorrect Password, please try again.",
    });
  }

  const token = jwt.sign(
    {
      id: foodPartner._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "Food Partner logged in successfully",
    foodPartner: {
      _id: foodPartner._id,
      name: foodPartner.name,
      email: foodPartner.email,
      contactName: foodPartner.contactName,
      phone: foodPartner.phone,
      address: foodPartner.address,
    },
  });
}

async function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
}

async function logoutFoodPartner(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "Food Partner logged out successfully",
  });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
};
