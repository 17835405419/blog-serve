const path = require("path");
const fs = require("fs");
const { QINIU_CONFIG } = require("../config/config.Item"); //获取测试域名
const { qnUpload, qnDelete } = require("../untils/qiniu_upload.js"); //上传七牛云函数

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

  // 删除上传的文章封面
  async deleteArticleCover(ctx) {
    try {
      const { imgUrl } = ctx.request.query;
      const key = imgUrl.replace(QINIU_CONFIG.DOMAIN_NAME, "");
      await qnDelete(key);

      ctx.body = {
        code: 0,
        msg: "删除成功",
      };
    } catch (error) {
      console.log(error);
    }
  }

  // 上传文章图片
  async articleImg(ctx) {
    try {
      let paths = ctx.req.file.path;
      const key = path.basename(paths);
      const reader = fs.createReadStream(paths); //生成可读流文件
      const res = await qnUpload(`articleImg/${key}`, reader);
      const imgUrl = QINIU_CONFIG.DOMAIN_NAME + res.key; //上传成功的图片地址
      if (imgUrl) {
        ctx.body = {
          errno: 0, // 注意：值是数字，不能是字符串
          data: [
            {
              url: imgUrl,
              alt: "",
              href: "",
            },
          ],
        };
      }
    } catch (error) {
      console.log(error);
    }
  }
  // 删除上传的文章图片
  async deleteArticleImg(ctx) {
    try {
      const { imgUrl } = ctx.request.query;
      const key = imgUrl.replace(QINIU_CONFIG.DOMAIN_NAME, "");
      await qnDelete(key);
      ctx.body = {
        code: 0,
        msg: "删除成功",
      };
    } catch (error) {
      console.log(error);
    }
  }

  // 上传轮播图
  async bannerImg(ctx) {
    try {
      let paths = ctx.req.file.path;
      const key = path.basename(paths);
      const reader = fs.createReadStream(paths); //生成可读流文件
      const res = await qnUpload(`banner/${key}`, reader);
      const imgUrl = QINIU_CONFIG.DOMAIN_NAME + res.key; //上传成功的图片地址
      if (imgUrl) {
        ctx.body = {
          code: 0,
          msg: "上传轮播图成功",
          imgUrl: imgUrl,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }
  // 删除上传轮播图
  async deleteBannerImg(ctx) {
    try {
      const { imgUrl } = ctx.request.query;
      const key = imgUrl.replace(QINIU_CONFIG.DOMAIN_NAME, "");
      await qnDelete(key);
      ctx.body = {
        code: 0,
        msg: "删除成功",
      };
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UploadController();
