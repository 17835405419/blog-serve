const {
  createArticleTag,
  findArticleTag,
} = require("../controller/article_controller/article_tag.controller");
const router = require("koa-router")();

// 新增文章标签
router.post("/artcileTag", createArticleTag);
// 获取文章标签
router.get("/artcileTag", findArticleTag);

module.exports = router;
