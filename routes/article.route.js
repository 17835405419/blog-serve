const {
  createArticle,
  findArticle,
  updateArticle,
  deleteArticle,
} = require("../controller/article_controller/article.controller");
const { koa2Jwt } = require("../config/config");

const router = require("koa-router")();

// 发布文章
router.post("/article", koa2Jwt(), createArticle);

//查询文章
router.get("/article", findArticle);

// 更新文章
router.put("/article", koa2Jwt(), updateArticle);

// 删除文章
router.delete("/article", koa2Jwt(), deleteArticle);

module.exports = router;
