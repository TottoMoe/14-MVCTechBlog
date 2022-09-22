const router = require("express").Router();
const { Post, User, Comment } = require("../models");

router.get("/", async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      attributes: { exclude: ["user_id", "updatedAt"] },
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    console.log(posts);

    // Pass serialized data and session flag into template
    res.render("all-post", {
      posts,
      isLoggedOut: !req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: { exclude: ["user_id", "updatedAt"] },
      include: [User],
    });

    if (postData) {
      const post = postData.get({ plain: true });

      res.render("single-post", {
        payload: { posts: [post], session: req.session },
        isLoggedOut: !req.session.loggedIn,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login", {
    isLoggedOut: !req.session.loggedIn,
  });
});

router.get("/signup", (req, res) => {
  // If the user doesn't have account, redirect to the sign up date
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup", {
    isLoggedOut: !req.session.loggedIn,
  });
});

module.exports = router;
