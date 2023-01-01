let ArticleTag = require("../../model/article_model/article_tags");
class ArticleTagService {
  async create(tagInfo) {
    // 新增
    return ArticleTag.create(tagInfo);
  }

  async find() {
    return ArticleTag.find({}, { _id: 0 });
  }
}

module.exports = new ArticleTagService();
