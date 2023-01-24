const Collection = require("../../model/article_model/article_collection");
const Article = require("../../model/article_model/article");

// 导入分页函数
const paging = require("../../untils/paging");

class ArticleCollectionService {
  async creates(collectionInfo) {
    // 新增评论
    try {
      await Collection.create(collectionInfo);
      // 修改文章收藏数
      await Article.updateOne(
        { articleId: collectionInfo.articleId },
        { $inc: { "articleHandle.collection": 1 } }
      );
      return true;
    } catch (error) {
      return error.message;
    }
  }
  async deletes(deleteQuery) {
    try {
      const { userId, articleId } = deleteQuery;
      await Comment.deleteOne({ userId, articleId });
      // 修改文章收藏数
      await Article.updateOne(
        { articleId: articleId },
        { $inc: { "articleHandle.collection": -1 } }
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

      Object.assign(findQuery, { query });
      const collectionInfo = await paging(Collection, findQuery);
      if (collectionInfo.count === 0) {
        return "查询结果为空";
      }
      return {
        code: 0,
        collectionInfo,
      };
    } catch (error) {
      return error.message;
    }
  }
}

module.exports = new ArticleCollectionService();
