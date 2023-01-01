let mongoose = require("mongoose");
let schema = new mongoose.Schema({
  tagId: {
    type: Number,
    default: Date.now,
    unique: true,
  },
  tagName: {
    type: String,
    required: true,
  },
});

let ArticleTags = mongoose.model("article_tags", schema);

module.exports = ArticleTags;
