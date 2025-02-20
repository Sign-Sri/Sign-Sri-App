const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./auth/authRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
