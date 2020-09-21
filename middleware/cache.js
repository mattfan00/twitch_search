const { Op } = require("sequelize");
const User = require("../models/user");

async function checkCache(req, res, next) {
  let channelName = req.query.name;

  if (!channelName || channelName == "") {
    return res.status(400).json({
      error: {"message": "No channel name provided"}
    });
  }

  const foundUser = await User.findOne({
    where: {
      username: {
        [Op.like]: channelName 
      }
    }
  });

  // Check if the user is already cached
  if (foundUser != null) { // Get user from the database
    return res.json(foundUser);
  } else { // Call API to get user
    next();
  } 
}

module.exports = checkCache; 