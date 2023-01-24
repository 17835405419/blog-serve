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
      const { articleId, userId } = deleteQuery;
      await Stars.deleteOne({ articleId, userId });
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
      // 定义查询条件
      let query = {};
      findQuery.articleId &&
        Object.assign(query, { articleId: findQuery.articleId });
      findQuery.userId && Object.assign(query, { userId: findQuery.userId });
      findQuery.authorId &&
        Object.assign(query, { authorId: findQuery.authorId });

      // 将query参数合并到 findQuery对象中
      Object.assign(findQuery, { query });

      const starInfo = await paging(Stars, findQuery);

      if (starInfo.count === 0) {
        return "查询结果为空";
      }
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
