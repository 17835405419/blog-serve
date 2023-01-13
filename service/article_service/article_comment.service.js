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
      const commentInfo = await paging(Comment, findQuery);

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
