const {
  createArticle,
  findArticle,
  updateArticle,
  deleteArticle,
} = require("../controller/article.controller");

const router = require("koa-router")();
router.prefix("/api");

// 发布文章
router.post("/article", createArticle);

//查询文章
router.get("/article", findArticle);

// 更新文章
router.put("/article", updateArticle);

// 删除文章
router.delete("/article", deleteArticle);

// // 查询单个文章
// router.get("/findOne", findOneArticle);
// // 查询所有文章 （前端）
// router.get("/web/findAll", findAll);
// // 根据浏览量查询文章（前端）
// router.get("/web/findViewAll", findViewAll);
// // 修改文章
// router.post("/updata", updataArticle);

// // 删除文章
// router.post("/del", delArticle);

module.exports = router;
