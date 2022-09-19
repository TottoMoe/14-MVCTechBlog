const router = require('express').Router();
const { Post, User, Comment } = require('../models/');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, rest) => {
  try {
    const postData = await Post.findAll({
      attributes: { exclude: ['updatedAt', 'user_id'] },
      include: [
        { model: User, attributes: { exclude: ['updatedAt', 'password'] }},
        { model: Comment },
      ],
      where: {
        user_id: req.session.userId,
      }
    })

    const posts = postData.map(post => post.get({ plain: true }));

    res.render('all-posts', { //{{}}
      layout: 'dashboard',
      payload: { posts, session: req.session }
    });
  } catch (err) {
    res.redirect('login');
  }
})

router.get('/new', withAuth, (req, res) => {
  res.render('new-post', {
    layout: 'dashboard',
  });
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if(postData) {
      const post = postData.get({ plain: true });

      res.render('edit-post', {
        layout: 'dashboard',
        payload: { posts: post, session: req.session }
      })
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;