const router = require("koa-router")();

const { createBanner, getBanner } = require("../controller/banner.controller");
const { koa2Jwt } = require("../config/config"); // 验证token 中间件
// 轮播图上传接口
router.post("/banner", koa2Jwt(), createBanner);
// 获取轮播图
router.get("/banner", getBanner);
module.exports = router;
