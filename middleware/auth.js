/**
 *  验证用户
 */
const jwt = require("jsonwebtoken"); //生成token
const { find } = require("../service/users.service"); //导入用户service层
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
  verify: async (ctx, decodeToken) => {
    // 解码的token数据挂载到上下文中
    ctx.userName = decodeToken["userName"];
    const res = await find({ userName: ctx.userName });
    if (res.isDisable === 1) {
      // 账号被封禁
      throw "Account blocked";
    }
  },

  // 单独使用的验证
  verifyOne: (token) => {
    return jwt.verify(token, jwtItem.secret);
  },
};
