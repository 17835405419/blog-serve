let Fans = require("../../model/article_model/fans");
let Article = require("../../model/article_model/article");
class ArticleFansService {
  async create(fansInfo) {
    await Fans.create(fansInfo);
  }
}

module.exports = new ArticleFansService();
