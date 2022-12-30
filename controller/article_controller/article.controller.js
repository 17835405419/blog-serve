const {
  create,
  find,
  update,
  deletes,
} = require("../../service/article_service/article.service");

class ArticleController {
  async createArticle(ctx) {
    // 发布文章
    try {
      const articleInfo = ctx.request.body;
      await create(articleInfo);
      ctx.body = {
        code: 0,
        msg: "文章发布成功",
      };
    } catch (error) {
      console.log(error);
    }
  }

  async findArticle(ctx) {
    // 查询文章
    try {
      const condition = ctx.query;
      const res = await find(condition);
      ctx.body = {
        code: 0,
        msg: "查询成功",
        res: res,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async findArticleAll() {
    // 查询全部文章
    try {
      const { isShowAll } = ctx.query;
      const res = await find({ isShowAll });
      ctx.body = {
        code: 0,
        msg: "查询成功",
        res: res,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async updateArticle(ctx) {
    // 更新文章
    try {
      const { articleId } = ctx.query;
      const updateInfo = ctx.request.body;
      const res = await update({ articleId }, updateInfo);
      if (res.acknowledged !== false) {
        ctx.body = {
          code: 0,
          msg: "更新成功",
        };
      } else {
        ctx.body = {
          code: 1,
          msg: "更新失败",
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteArticle(ctx) {
    // 删除文章
    try {
      const { articleId } = ctx.query;
      const res = await deletes({ articleId });
      if (res.deletedCount !== 0) {
        ctx.body = {
          code: 0,
          msg: "删除成功",
        };
      } else {
        ctx.body = {
          code: 1,
          msg: "删除失败",
        };
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ArticleController();
