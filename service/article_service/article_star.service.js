const Stars = require("../../model/article_model/article_star");
const Article = require("../../model/article_model/article");

// 导入分页函数
const paging = require("../../untils/paging");

class ArticleStarService {
  async creates(starInfo) {
    // 新增点赞
    try {
      const res = await Stars.create(starInfo);

      // 修改文章点赞数
      const ress = await Article.updateOne(
        { articleId: starInfo.articleId },
        { $inc: { "articleHandle.star": 1 } }
      );

      return true;
    } catch (error) {
      return error.message;
    }
  }
  async deletes(deleteQuery) {
    try {
      const { articleId } = deleteQuery;
      await Stars.deleteOne({ articleId });
      // 修改文章点赞数
      await Article.updateOne(
        { articleId: articleId },
        { $inc: { "articleHandle.star": -1 } }
      );
      return true;
    } catch (error) {
      return error.message;
    }
  }

  async finds(findQuery) {
    try {
      const starInfo = await paging(Stars, findQuery);
      return {
        code: 0,
        starInfo,
      };
    } catch (error) {
      return error.message;
    }
  }
}

module.exports = new ArticleStarService();
