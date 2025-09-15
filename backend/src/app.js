const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const foodRoutes = require("./routes/food.routes");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//for reading cookie data
app.use(cookieParser());
app.use(express.json());

//default route
app.get("/", (req, res) => {
  res.send(
    "Hello, Welcome to Bhookh. If you know how you got here, you are a true developer ;)"
  );
});

app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);

module.exports = app;
