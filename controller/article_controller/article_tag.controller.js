const {
  create,
  find,
} = require("../../service/article_service/article_tag.service");
class ArticleTagController {
  async createArticleTag(ctx) {
    try {
      const { tagName } = ctx.request.body;
      await create({ tagName });
      ctx.body = {
        code: 0,
        mag: "新增标签成功",
      };
    } catch (error) {
      console.log(error);
    }
  }
  async findArticleTag(ctx) {
    try {
      const res = await find();
      ctx.body = {
        code: 0,
        msg: "获取标签成功",
        data: res,
      };
    } catch (error) {}
  }
}

module.exports = new ArticleTagController();
