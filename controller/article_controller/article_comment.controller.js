/**
 * 点赞模块
 */

const {
  creates,
  deletes,
  finds,
} = require("../../service/article_service/article_comment.service");
class ArticleCommentController {
  async createComment(ctx) {
    // 新增点赞
    const commentInfo = ctx.request.body;
    const res = await creates(commentInfo);
    if (res === true) {
      ctx.body = {
        code: 0,
        msg: "评论成功",
      };
      return;
    }
    ctx.body = {
      code: 1,
      msg: res,
    };
  }
  async deleteComment(ctx) {
    // 删除点赞
    const deleteQuery = ctx.query;
    const res = await deletes(deleteQuery);
    if (res === true) {
      ctx.body = {
        code: 0,
        msg: "删除评论成功",
      };
      return;
    }
    ctx.body = {
      code: 1,
      msg: res,
    };
  }
  async findComment(ctx) {
    const findQuery = ctx.query;
    const res = await finds(findQuery);

    if (res.code == 0) {
      ctx.body = {
        code: 0,
        data: res.commentInfo.res,
      };
      return;
    }
    ctx.body = {
      code: 1,
      msg: res,
    };
  }
}

module.exports = new ArticleCommentController();
