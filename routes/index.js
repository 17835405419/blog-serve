const router = require("koa-router")();
const fs = require("fs");
const path = require("path");

const files = fs.readdirSync(__dirname);
router.prefix("/api"); //设置统一路由前缀

files.forEach((file) => {
  if (file !== "index.js") {
    const fileRouter = require(path.join(__dirname, file));
    router.use(fileRouter.routes());
  }
});

module.exports = router;
