module.exports = function () {
  // 配置项处理
  return async (ctx, next) => {
    // 中间件逻辑处理
    try {
      // 验证正常则放行
      await next();
    } catch (error) {
      const { message } = error;
      switch (message) {
        case "Token not found":
          ctx.body = {
            code: 1002,
            msg: "token为空",
          };
          break;
        case "jwt malformed":
          ctx.body = {
            code: 1003,
            msg: "token无效",
          };
          break;
        case "jwt expired":
          ctx.body = {
            code: 1004,
            msg: "token过期",
          };
        case "Account blocked":
          ctx.body = {
            code: 1005,
            msg: "该账户已被封禁",
          };
          break;
      }
    }
  };
};
