const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING, 
    allowNull: false
  }, 
  followerCount: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  // Other model options go here
});

(async () => {
  await sequelize.sync();
})();

module.exports = User;