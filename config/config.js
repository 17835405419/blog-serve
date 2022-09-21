const koa2Cors = require("koa2-cors");
const koa2Mongoose = require("mongoose");
const koa2Bodyparser = require("koa-bodyparser");
const md5 = require("md5"); //md5加密

/**
 *  jwt 验证相关
 * */
const koa2Jwt = require("koa-jwt"); //koa-jwt验证token
const { jwtItem } = require("./config.Item");
// 验证token
const { verify } = require("../middleware/auth");

module.exports = {
  //解决跨域
  cors: () => {
    return koa2Cors({
      origin: function (ctx) {
        //设置允许来自指定域名请求
        if (ctx.url === "/test") {
          return "*"; // 允许来自所有域名请求
        }
        return "http://localhost:8080"; //只允许http://localhost:8080这个域名的请求
      },
      maxAge: 5, //指定本次预检请求的有效期，单位为秒。
      credentials: true, //是否允许发送Cookie
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], //设置所允许的HTTP请求方法
      allowHeaders: ["Content-Type", "Authorization", "Accept"], //设置服务器支持的所有头信息字段
      exposeHeaders: ["WWW-Authenticate", "Server-Authorization"], //设置获取其他自定义字段
    });
  },
  // 连接数据库
  mongoConnect: () => {
    return koa2Mongoose
      .connect("mongodb://localhost:27017/jianshu", { useNewUrlParser: true })
      .then(() => {
        console.log("连接成功");
      })
      .catch((err) => {
        console.error("连接失败", err);
      });
  },
  // 解决post参数问题
  bodyParser: () => {
    return koa2Bodyparser({
      enableTypes: ["json", "form", "text"],
    });
  },

  // koa-jwt 验证jwt
  koa2Jwt: () => {
    return koa2Jwt({
      secret: jwtItem.secret,
      isRevoked: verify,
    });
  },
  // MD5加密
  md5: md5,
};
