const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  const post = await Post.findAll();
  res.json(post);
});

router.post("/", withAuth, async (req, res) => {
  // try {
  const newPost = await Post.create({
    title: req.body.title,
    content: req.body.content,
    userID: req.session.userId,
  });
  console.log("newPost here:", newPost);
  res.status(200).json(newPost);
  // } catch (err) {
  //   res.status(400).json(err);
  // }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (postData) {
      res.status(200).json(postData);
    } else {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (postData) {
      res.status(200).json(postData);
    } else {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
