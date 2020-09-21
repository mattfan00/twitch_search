const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING, 
    allowNull: false
  }, 
  followerCount: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

(async () => {
  await sequelize.sync();
})();

module.exports = User;