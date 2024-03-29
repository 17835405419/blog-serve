const Comment = require("../../model/article_model/article_comment");
const Article = require("../../model/article_model/article");

// 导入分页函数
const paging = require("../../untils/paging");

class ArticleCommentrService {
  async creates(commentInfo) {
    // 新增评论
    try {
      await Comment.create(commentInfo);
      // 修改文章评论数
      await Article.updateOne(
        { articleId: commentInfo.articleId },
        { $inc: { "articleHandle.comment": 1 } }
      );
      return true;
    } catch (error) {
      return error.message;
    }
  }
  async deletes(deleteQuery) {
    try {
      const { commentId, articleId } = deleteQuery;
      await Comment.deleteOne({ commentId });
      // 修改文章评论数
      await Article.updateOne(
        { articleId: articleId },
        { $inc: { "articleHandle.comment": -1 } }
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
      findQuery.commentId &&
        Object.assign(query, { commentId: findQuery.commentId });

      Object.assign(findQuery, { query });
      const commentInfo = await paging(Comment, findQuery);
      if (commentInfo.count === 0) {
        return "查询结果为空";
      }
      return {
        code: 0,
        commentInfo,
      };
    } catch (error) {
      return error.message;
    }
  }
}

module.exports = new ArticleCommentrService();
