/**
 * 点赞模块
 */

const {
  creates,
  deletes,
  finds,
} = require("../../service/article_service/article_star.service");
class ArticleStarController {
  async createStar(ctx) {
    // 新增点赞
    const starInfo = ctx.request.body;
    const res = await creates(starInfo);
    if (res === true) {
      ctx.body = {
        code: 0,
        msg: "点赞成功",
      };
      return;
    }
    ctx.body = {
      code: 1,
      msg: res,
    };
  }
  async deleteStar(ctx) {
    // 取消点赞
    const deleteQuery = ctx.query;
    const res = await deletes(deleteQuery);
    if (res === true) {
      ctx.body = {
        code: 0,
        msg: "取消点赞成功",
      };
      return;
    }
    ctx.body = {
      code: 1,
      msg: res,
    };
  }
  async findStar(ctx) {
    const findQuery = ctx.query;
    const res = await finds(findQuery);
    if (res.code == 0) {
      ctx.body = {
        code: 0,
        data: res.starInfo.res,
      };
      return;
    }
    ctx.body = {
      code: 1,
      msg: res,
    };
  }
}

module.exports = new ArticleStarController();
