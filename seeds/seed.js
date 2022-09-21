const sequelize = require("../config/config");
const userData = require("./userData.json");
const postData = require("./postData.json");
const commentData = require("./commentData.json");
const { User, Post, Comment } = require("../models");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await User.bulkCreate(userData, { individualHooks: true });
  await Post.bulkCreate(postData);
  await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedDatabase();
