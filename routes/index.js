const router = require("koa-router")();
const fs = require("fs");
const path = require("path");

const files = fs.readdirSync(__dirname);

files.forEach((file) => {
  if (file !== "index.js") {
    const fileRouter = require(path.join(__dirname, file));
    router.use(fileRouter.routes());
  }
});

module.exports = router;
