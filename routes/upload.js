const multer = require("koa-multer");
const fs = require("fs");
const path = require("path");
const router = require("koa-router")();
router.prefix("/upload");

let storage = multer.diskStorage({
  //设置文件存储位置
  //  动态创建 防止集中在一个文件夹不利于后期维护
  destination: function (req, file, cb) {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDay();
    let dir = "public/uploads/" + year + month + day;
    // 判断该文件夹是否存在
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true,
      });
    }
    //将文件上传到目录
    cb(null, dir);
  },
  // 设置上传的文件名称
  filename: function (req, file, cb) {
    // filedname文件原来的名称+时间戳+文件的后缀名
    let fileName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

let upload = multer({ storage: storage });

// 上传图片接口
router.post("/img", upload.single("myfile"), async (ctx) => {
  let path = ctx.req.file.path;
  //   ctx.origin 返回服务器的真实地址
  path = ctx.origin + "" + path.replace("public", "");

  ctx.body = {
    data: path,
  };
});

router.post("/article/img", upload.single("articleImg"), async (ctx) => {
  let path = ctx.req.file.path;
  //   ctx.origin 返回服务器的真实地址
  path = ctx.origin + "" + path.replace("public", "");

  ctx.body = {
    data: path,
  };
});

//富文本编辑器上传图片
router.post("/editor/img", upload.single("editorFile"), async (ctx) => {
  let path = ctx.req.file.path;
  //   ctx.origin 返回服务器的真实地址
  path = ctx.origin + "" + path.replace("public", "");
  ctx.body = {
    errno: 0,
    data: [
      {
        url: path,
        alt: "",
        href: "",
      },
    ],
  };
});


module.exports = router;
