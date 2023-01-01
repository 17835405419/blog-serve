const path = require("path");
const fs = require("fs");
const { QINIU_CONFIG } = require("../config/config.Item"); //获取测试域名
const { qnUpload } = require("../untils/qiniu_upload.js"); //上传七牛云函数

class UploadController {
  // 修改头像
  async changeAvater(ctx) {
    try {
      let paths = ctx.req.file.path;
      const key = path.basename(paths);
      const reader = fs.createReadStream(paths); //生成可读流文件
      const res = await qnUpload(`avater/${key}`, reader);
      const imgUrl = QINIU_CONFIG.DOMAIN_NAME + res.key; //上传成功的图片地址
      if (imgUrl) {
        // await update({ avater: imgUrl }, { userName: ctx.userName });
        ctx.body = {
          code: 0,
          msg: "上传头像成功",
          imgUrl: imgUrl,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }
  // 上传文章封面
  async articleCover(ctx) {
    try {
      let paths = ctx.req.file.path;
      const key = path.basename(paths);
      const reader = fs.createReadStream(paths); //生成可读流文件
      const res = await qnUpload(`articleCover/${key}`, reader);
      const imgUrl = QINIU_CONFIG.DOMAIN_NAME + res.key; //上传成功的图片地址
      if (imgUrl) {
        // await update({ avater: imgUrl }, { userName: ctx.userName });
        ctx.body = {
          code: 0,
          msg: "上传封面成功",
          imgUrl: imgUrl,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UploadController();
