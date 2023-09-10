// models/Comment.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  comment: { type: String, required: true },
  postId: { type: Schema.Types.ObjectId, ref: 'Post' },
  parentId: { type: Schema.Types.ObjectId, ref: 'Comment' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;