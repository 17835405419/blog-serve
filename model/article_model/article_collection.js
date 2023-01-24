let mongoose = require("mongoose");

// 文章评论文档对象
let schema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  }, //评论的用户ID
  nickName: {
    type: String,
    required: true,
  }, //评论的用户昵称
  authorId: {
    type: Number,
    required: true,
  }, //文章的作者Id
  articleId: {
    type: Number,
    required: true,
  }, //文章Id
  title: {
    type: String,
    required: true,
  }, //收藏的文章标题
  createTime: {
    type: Number,
    default: Date.now,
  }, //评论时间
});

let Collection = mongoose.model("article_collection", schema);

module.exports = Collection;
