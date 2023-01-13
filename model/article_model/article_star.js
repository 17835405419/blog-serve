let mongoose = require("mongoose");

//  粉丝文档对象
let schema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  }, //点赞的用户ID
  nickName: {
    type: String,
    required: true,
  }, //点赞的用户昵称
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
  }, //点赞的文章标题
  createTime: {
    type: Number,
    default: Date.now,
  }, //点赞时间
});

let Stars = mongoose.model("article_stars", schema);

module.exports = Stars;
