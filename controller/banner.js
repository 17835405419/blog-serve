let Banner = require("../model/banner");
const multer = require("koa-multer");
const fs = require("fs");
const path = require("path");

let storage = multer.diskStorage({
  //设置文件存储位置
  //  动态创建 防止集中在一个文件夹不利于后期维护
  destination: function(req, file, cb) {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDay();
    let dir = "public/banners/" + year + month + day;
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
  filename: function(req, file, cb) {
    // filedname文件原来的名称+时间戳+文件的后缀名
    let fileName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

let upload = multer({ storage: storage });

// 首页轮播图上传接口
const setBanner = async (ctx) => {
   let {id} = ctx.request.body
  let path = ctx.req.file.path;
  //  ctx.origin 返回服务器的真实地址
  path = ctx.origin + "" + path.replace("public", "");
  await Banner.create({
    img: path
  }).then((rel) => {
    if (rel) {
      ctx.body = {
        code: 200,
        msg: "上传成功",
        data: rel,
      };
    } else {
      ctx.body = {
        code: 300,
        msg: "上传失败",
      };
    }
  });
};


// 获取轮播图接口
const getBanners = async(ctx)=>{
   await Banner.find().then(rel=>{
     if (rel) {
       ctx.body={
        code:200,
        msg:'获取轮播图成功',
        result:rel
       }
     }else{
      ctx.body={
        code:300,
        msg:'获取轮播图失败'
      }
    }
   })
}
module.exports = {
  setBanner,
  upload,
  getBanners
};
