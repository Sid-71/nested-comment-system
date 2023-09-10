const express = require("express");
const router = express.Router();
const commentController = require("../Controllers/commentController");

router.post("/create-comment",commentController.createComment);
router.get("/get-comment-replies",commentController.getReplies);
router.post("/create-post",commentController.createPost);
router.post("/add-user",commentController.createUser);



module.exports = router;