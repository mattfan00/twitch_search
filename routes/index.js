const express = require("express");
const router = express.Router();
const axios = require("axios");

const checkCache = require("../middleware/cache");

const User = require("../models/user");

router.get("/channels", checkCache, async (req, res) => {
  let channelName = req.query.name;

  let url = "https://api.twitch.tv/kraken/search/channels?query=" + channelName
  let results = await axios.get(url, {
    headers: {
      "Accept": "application/vnd.twitchtv.v5+json",
      "Client-id": "kimne78kx3ncx6brgo4mv6wki5h1ko"
    }
  })
    .catch(err => {
      return res.status(400).json({
        error: {message: "Error accessing Twitch API"}
      })
    })

  let channel = results.data.channels[0]

  // If no channels are returned from the search or the channel name
  // isn't the top search result, then the channel doesn't exist
  if (!channel || (channel.display_name.toLowerCase() != channelName.toLowerCase())) {
    return res.status(400).json({
      error: {"message": "This channel doesn't exist"}
    });
  }

  // Create new entry in cache
  const newUser = await User.create({
    username: channel.display_name,
    followerCount: channel.followers
  })

  // Clear cache entry after five minutes
  const EXPIRE_TIME = 5 * 60 * 1000
  setTimeout(async () => {
    newUser.destroy();
  }, EXPIRE_TIME)

  res.json(newUser.toJSON())
});

module.exports = router