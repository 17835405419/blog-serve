const {
  register,
  login,
  getUserInfo,
} = require("../controller/user.controller");
const router = require("koa-router")();
// 验证token
const { koa2Jwt } = require("../config/config");

router.prefix("/api/users");

// 用户注册
router.post("/register", register);

// 用户登录
router.post("/login", login);

// 获取用户信息
router.get("/getUserInfo", koa2Jwt(), getUserInfo);

// // 验证用户信息
// router.post("/verify", verify);

// // 修改密码
// router.post("/updata/pwd", updataPwd);

// //修改用户信息
// router.post("/updata/personal", updatePersonal);

module.exports = router;
