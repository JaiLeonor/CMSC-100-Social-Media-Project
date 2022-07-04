const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  timeStamp: { type: Date, default: Date.now },
  author_username: { type: String, required: true },
  author_name: { type: String, required: true },
  content: {type: String, required: true }
});

module.exports = mongoose.model("Post", PostSchema);