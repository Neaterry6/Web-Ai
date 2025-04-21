const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/respond", async (req, res) => {
  const { message } = req.body;

  if (message.toLowerCase().includes("time")) {
    const apiResponse = await axios.get("https://ap-c4yl.onrender.com/api/datetime");
    return res.send({ reply: `Current time is: ${apiResponse.data.time}` });
  }

  res.send({ reply: "Ayanfe is processing your query..." });
});

module.exports = router;
