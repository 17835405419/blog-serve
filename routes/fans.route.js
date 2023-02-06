const {
  follow,
  findFans,
  upfollow,
} = require("../controller/user_controller/fans.controller");
const { koa2Jwt } = require("../config/config");
const router = require("koa-router")();

// 关注作者api
router.post("/fans", koa2Jwt(), follow);

// 取消关注作者api
router.delete("/fans", koa2Jwt(), upfollow);

//查询粉丝or关注列表
router.get("/fans", koa2Jwt(), findFans);

module.exports = router;
