/**
 *  验证用户
 */
const jwt = require("jsonwebtoken"); //生成token
const { find } = require("../service/user_service/users.service"); //导入用户service层
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
    const res = await find(
      { userName: ctx.userName },
      { isDisable: 1, role: 1 }
    );
    if (res[0].isDisable === 1) {
      // 账号被封禁
      throw "Account blocked";
    } else {
      // 将角色权限挂载至上下文
      ctx.role = res[0].role;
    }
  },

  // 单独使用的验证
  verifyOne: (token) => {
    return jwt.verify(token, jwtItem.secret);
  },
};
