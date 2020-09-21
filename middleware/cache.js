const { Op } = require("sequelize");
const User = require("../models/user");

async function checkCache(req, res, next) {
  let channelName = req.query.name;

  if (!channelName || channelName == "") {
    return res.status(400).json({
      error: {"message": "No channel name provided"}
    })
  }

  const foundUser = await User.findOne({
    where: {
      username: {
        [Op.like]: channelName 
      }
    }
  });

  // Check if the user is already cached
  if (foundUser != null) {
    console.log("its in the database");
    return res.json(foundUser);
  } else {
    console.log("call api");
    next();
  } 
}

module.exports = checkCache; 