const express = require("express");
const router = express.Router();
const axios = require("axios");
const Chat = require("./models/chatModel"); // Import chat model for history

router.post("/respond", async (req, res) => {
  const { message, userId } = req.body;

  if (!userId) {
    return res.status(400).send({ reply: "User ID is required to process your request." });
  }

  try {
    let botReply = "I'm Ayanfe, your chatbot companion! Ask me anything."; // Default reply

    // **Chat API**
    if (message.toLowerCase().includes("ask")) {
      const apiResponse = await axios.post("https://ap-c4yl.onrender.com/chat/ask", {
        user_id: userId,
        query: message,
      });
      botReply = apiResponse.data.response;
    }

    // **Quotes API**
    else if (message.toLowerCase().includes("quote")) {
      const keyword = message.toLowerCase().replace("quote", "").trim(); // Extract keyword
      if (!keyword) {
        botReply = "Please specify a category for the quote. Example: 'Quote love' or 'Quote inspiration'.";
      } else {
        const apiResponse = await axios.get(`https://ap-c4yl.onrender.com/quotes/category?category=${keyword}`);
        if (apiResponse.data.quotes?.length) {
          botReply = apiResponse.data.quotes[Math.floor(Math.random() * apiResponse.data.quotes.length)];
        } else {
          botReply = "Sorry, no quotes found for that category.";
        }
      }
    }

    // **Searchable Quotes API**
    else if (message.toLowerCase().includes("search quote")) {
      const query = message.toLowerCase().replace("search quote", "").trim(); // Extract query
      if (!query) {
        botReply = "Please specify a keyword to search quotes. Example: 'Search quote success'.";
      } else {
        const apiResponse = await axios.get(`https://ap-c4yl.onrender.com/quotes/search?keyword=${query}`);
        botReply = apiResponse.data.quotes.join("\n") || "Sorry, no quotes matched your search.";
      }
    }

    // **Music Lyrics API**
    else if (message.toLowerCase().includes("lyrics")) {
      const song = message.toLowerCase().replace("lyrics", "").trim(); // Extract song name
      if (!song) {
        botReply = "Please specify a song to fetch its lyrics. Example: 'Lyrics Imagine'.";
      } else {
        const apiResponse = await axios.get(`https://ap-c4yl.onrender.com/music-lyrics?song=${encodeURIComponent(song)}`);
        botReply = apiResponse.data.lyrics || "Sorry, I couldn't find lyrics for that song.";
      }
    }

    // **Image Search API**
    else if (message.toLowerCase().includes("image")) {
      const query = message.toLowerCase().replace("image", "").trim(); // Extract query
      if (!query) {
        botReply = "Please specify a search term for the image. Example: 'Image sunset'.";
      } else {
        const apiResponse = await axios.get(`https://ap-c4yl.onrender.com/images/search?query=${encodeURIComponent(query)}`);
        if (apiResponse.data.imageUrl) {
          botReply = `Here’s the image: `;
          botReply += apiResponse.data.imageUrl; // Include the image URL directly
        } else {
          botReply = "Sorry, no image found for that query.";
        }
      }
    }

    // **Mood Analysis API**
    else if (message.toLowerCase().includes("mood")) {
      const apiResponse = await axios.post("https://ap-c4yl.onrender.com/mood", { text: message });
      botReply = `Your mood seems to be: ${apiResponse.data.mood}`;
    }

    // **Datetime API**
    else if (message.toLowerCase().includes("time") || message.toLowerCase().includes("date")) {
      const apiResponse = await axios.get("https://ap-c4yl.onrender.com/datetime");
      botReply = `The current date and time is: ${apiResponse.data.time}`;
    }

    // **Roast API**
    else if (message.toLowerCase().includes("roast")) {
      const category = message.toLowerCase().split("roast ")[1]?.trim(); // Extract the roast category
      const validCategories = ["savage", "light", "general", "savage-burn", "funny", "personalized"];
      if (!category) {
        botReply = "Please specify a roast category. Example: 'Roast savage'.";
      } else if (!validCategories.includes(category)) {
        botReply = "Invalid category. Available categories: savage, light, general, savage-burn, funny, personalized.";
      } else if (category === "personalized") {
        const name = "John"; // Example name; replace with actual logic if needed
        const apiResponse = await axios.get(`https://roast-api.onrender.com/roast/personalized?name=${encodeURIComponent(name)}`);
        botReply = apiResponse.data.roast;
      } else {
        const apiResponse = await axios.get(`https://roast-api.onrender.com/roast/${category}`);
        botReply = apiResponse.data.roast;
      }
    }

    // Save chat history to the database
    await Chat.create({
      userId,
      message,
      reply: botReply,
    });

    // Return bot reply
    res.send({ reply: botReply });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send({ reply: "Sorry, something went wrong while processing your request." });
  }
});

router.get("/history", async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).send({ error: "User ID is required to fetch chat history." });
  }

  try {
    const chatHistory = await Chat.find({ userId }).sort({ timestamp: -1 }); // Fetch and sort by newest
    res.send({ history: chatHistory });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).send({ error: "Could not fetch chat history." });
  }
});

module.exports = router;
