let mongoose = require("mongoose");

// 文章评论文档对象
let schema = new mongoose.Schema({
  // 因为同一篇文章 可能同一个用户发表多个评论
  // 所以单用用户id和文章id无法做到单个删除操作
  // 所以需要增加评论ID
  commentId: {
    type: Number,
    default: Date.now,
  },
  userId: {
    type: Number,
    required: true,
  }, //评论的用户ID
  nickName: {
    type: String,
    required: true,
  }, //评论的用户昵称
  avater: {
    type: String,
    required: true,
  }, //评论的用户头像
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
  }, //评论的文章标题
  content: {
    type: String,
    required: true,
  }, //评论内容
  createTime: {
    type: Number,
    default: Date.now,
  }, //评论时间
});

let Comment = mongoose.model("article_comments", schema);

module.exports = Comment;
