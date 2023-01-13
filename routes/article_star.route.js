const {
  createStar,
  findStar,
  deleteStar,
} = require("../controller/article_controller/article_star.controller");
const { koa2Jwt } = require("../config/config");

const router = require("koa-router")();

// 点赞文章api
router.post("/artcileStar", koa2Jwt(), createStar);
// 获取点赞数
router.get("/artcileStar", koa2Jwt(), findStar);
// 取消点赞
router.delete("/artcileStar", koa2Jwt(), deleteStar);

module.exports = router;
