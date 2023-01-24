/* 收藏模块 */
const {
  creates,
  deletes,
  finds,
} = require("../../service/article_service/article_collection.service");
class ArticleCollectionController {
  async createCollection(ctx) {
    // 新增文章收藏
    const collectionInfo = ctx.request.body;
    const res = await creates(collectionInfo);
    if (res === true) {
      ctx.body = {
        code: 0,
        msg: "收藏成功",
      };
      return;
    }
    ctx.body = {
      code: 1,
      msg: res,
    };
  }
  async deleteCollection(ctx) {
    // 删除文章收藏
    const deleteQuery = ctx.query;
    const res = await deletes(deleteQuery);
    if (res === true) {
      ctx.body = {
        code: 0,
        msg: "取消收藏成功",
      };
      return;
    }
    ctx.body = {
      code: 1,
      msg: res,
    };
  }

  async findCollection(ctx) {
    const findQuery = ctx.query;
    const res = await finds(findQuery);
    if (res.code === 0) {
      ctx.body = {
        code: 0,
        data: res.collectionInfo,
      };
      return;
    }
    ctx.body = {
      code: 1,
      msg: res,
    };
  }
}

module.exports = new ArticleCollectionController();
