const express = require("express");
const {
  createComment,
  deleteComment,
  updateComment,
} = require("../controllers/comments");

const router = express.Router();

router.post("/createCommet", createComment);
router.delete("/deleteComment", deleteComment);
router.patch("/updateCommet", updateComment);

module.exports = router;
