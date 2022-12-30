const {
  register,
  login,
  getUserInfo,
  updateUserInfo,
  updataPwd,
  refreshToken,
} = require("../controller/user.controller");
const router = require("koa-router")();
// 验证token
const { koa2Jwt } = require("../config/config");

router.prefix("/users");

// 用户注册
router.post("/register", register);

// 用户登录
router.post("/login", login);

// 获取用户信息
router.get("/getUserInfo", koa2Jwt(), getUserInfo);

//更新用户信息
router.put("/updateUserInfo", koa2Jwt(), updateUserInfo);

// 刷新token
router.post("/refreshToken", refreshToken);

// // 修改密码
router.put("/updatePwd", koa2Jwt(), updataPwd);

module.exports = router;
