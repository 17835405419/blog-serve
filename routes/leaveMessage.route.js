const {
  createMessage,
  deleteMessage,
  findMessage,
} = require("../controller/web_controller/leaveMessage.controller.js");
const router = require("koa-router")();
const { koa2Jwt } = require("../config/config");

// 添加留言
router.post("/leaveMessage", koa2Jwt(), createMessage);
// 删除留言
router.delete("/leaveMessage", koa2Jwt(), deleteMessage);
// 查询留言
router.get("/leaveMessage", findMessage);

module.exports = router;
