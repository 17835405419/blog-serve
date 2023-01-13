const {
  createComment,
  deleteComment,
  findComment,
} = require("../controller/article_controller/article_comment.controller");
const router = require("koa-router")();
const { koa2Jwt } = require("../config/config");

// 添加评论
router.post("/comment", koa2Jwt(), createComment);
// 删除评论
router.delete("/comment", koa2Jwt(), deleteComment);
// 查询评论
router.get("/comment", koa2Jwt(), findComment);

module.exports = router;
