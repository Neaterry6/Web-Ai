const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./auth");
const chatRoutes = require("./chatController");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
