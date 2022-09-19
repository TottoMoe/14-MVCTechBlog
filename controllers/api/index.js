const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes.js');
const commentRoutes = require('./comment-routes.js');

router.use('/users', userRoutes);

router.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.use('/post', postRoutes);

router.get('/post', async (req, res) => {
  const post = await Post.findAll();
  res.json(post);
});

router.use('/comment', commentRoutes);

router.get('/comment', async (req, res) => {
  const comment = await Comment.findAll();
  res.json(comment);
});

module.exports = router;
