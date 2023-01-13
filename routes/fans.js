// const { upfollow, findAll } = require("../controller/fans.controller");

const router = require("koa-router")();
router.prefix("/fans");

// 关注作者api
// router.post("/follow", follow);

// 取消关注作者api
router.post("/upfollow");

//查询粉丝
router.get("/findAll");
module.exports = router;
