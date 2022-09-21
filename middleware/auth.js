/**
 *  验证用户
 */
const jwt = require("jsonwebtoken"); //生成token

// 导入插件配置
const { jwtItem } = require("../config/config.Item");

module.exports = {
  // 派发token
  sign: (condition) => {
    return jwt.sign(condition, jwtItem.secret, {
      expiresIn: jwtItem.expiresIn,
    });
  },

  // 验证token
  verify: (ctx) => {
    try {
      let token = ctx.header.authorization.replace(/Bearer/, "").trim();
      const res = jwt.verify(token, jwtItem.secret);
      ctx.userName = res.userName;
    } catch (error) {
      console.log(error);
    }
  },
};
