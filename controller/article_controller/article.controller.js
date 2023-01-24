const {
  create,
  find,
  update,
  deletes,
} = require("../../service/article_service/article.service");

class ArticleController {
  async createArticle(ctx) {
    // 发布文章

    const articleInfo = ctx.request.body;
    const res = await create(articleInfo);
    if (res === true) {
      ctx.body = {
        code: 0,
        msg: "文章发布成功",
      };
      return;
    }
    ctx.body = {
      code: 1,
      msg: res,
    };
  }

  async findArticle(ctx) {
    // 查询文章

    const condition = ctx.query;

    const res = await find(condition);
    if (res.code === 0) {
      ctx.body = {
        code: 0,
        msg: "查询成功",
        data: res.articleInfo,
      };
      return;
    }
    ctx.body = {
      code: 1,
      msg: res,
    };
  }

  async updateArticle(ctx) {
    // 更新文章

    const updateInfo = ctx.request.body;

    const res = await update(updateInfo);
    if (res === true) {
      ctx.body = {
        code: 0,
        msg: "更新成功",
      };
      return;
    }
    ctx.body = {
      code: 1,
      msg: res,
    };
  }

  async deleteArticle(ctx) {
    const deleteQuery = ctx.query;
    const res = await deletes(deleteQuery);
    if (res === true) {
      ctx.body = {
        code: 0,
        msg: "删除文章成功",
      };
      return;
    }
    ctx.body = {
      code: 1,
      msg: res,
    };
  }
}

module.exports = new ArticleController();
