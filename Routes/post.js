const express = require("express");
const {
  getPosts,
  createPost,
  deletePost,
  commentPost,
  likePost,
  deleteComment,
} = require("../controllers/post");
const router = express.Router();

router.route("/").get(getPosts);

router.route("/:postId/likepost").get(likePost);

router.route("/create").post(createPost);

router.route("/:postId/comment").post(commentPost);

router.route("/delete/:postId").delete(deletePost);

router.route("/:postId/:commentId").delete(deleteComment);


module.exports = router;
