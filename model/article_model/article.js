let mongoose = require("mongoose");

// 文章文档对象
let schema = new mongoose.Schema({
  articleId: {
    type: Number,
    unique: true,
    default: Date.now,
  }, //文章Id
  title: {
    type: String,
    required: true,
  },
  authorId: {
    type: Number,
    required: true,
  }, //作者Id
  authorName: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    required: true,
  }, //内容
  stemfrom: {
    type: String,
    required: true,
  }, //来源
  articlPartName: {
    type: String,
    default: "",
  }, //分区
  showTagList: {
    type: Array,
    default: [],
  }, //标签列表
  articleImg: {
    type: String,
    default: "",
  }, //文章封面图片
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
    collection: {
      type: Number,
      default: 0,
    },
  },
});
let Article = mongoose.model("articles", schema);

module.exports = Article;
