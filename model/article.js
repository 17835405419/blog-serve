let mongoose = require("mongoose");

// 文章文档对象
let schema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    default: Date.now,
    required: true,
  }, //文章Id
  title: {
    type: String,
    default: "",
  },
  author: {
    type: String,
    default: "",
  }, //作者
  content: {
    type: String,
    default: "",
  }, //内容
  stemfrom: {
    type: String,
    default: "",
  }, //来源
  articleImg: {
    type: String,
    default: "",
  }, //文章图片
  createTime: {
    type: Number,
    default: Date.now,
  }, //创建时间

  articleState: {
    type: Number,
    default: 0,
  }, //文章状态  0正常 1封禁 2待审核

  articleHandle: {
    // 文章点赞收藏评论操作
    read: {
      type: Number,
      default: 0,
    }, //阅读量
    star: {
      type: Number,
      default: 0,
    },
    comment: {
      type: Number,
      default: 0,
    },
  },
});
let Article = mongoose.model("articles", schema);

module.exports = Article;
