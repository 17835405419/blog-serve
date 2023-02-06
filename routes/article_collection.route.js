const {
  createCollection,
  deleteCollection,
  findCollection,
} = require("../controller/article_controller/article_collection.controller");
const router = require("koa-router")();
const { koa2Jwt } = require("../config/config");

router.post("/collect", koa2Jwt(), createCollection);
router.delete("/collect", koa2Jwt(), deleteCollection);
router.get("/collect", koa2Jwt(), findCollection);

module.exports = router;
