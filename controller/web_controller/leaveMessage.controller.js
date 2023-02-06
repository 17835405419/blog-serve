/* 
    留言模块
*/
const {
  creates,
  deletes,
  finds,
} = require("../../service/web_controller/leaveMessage.service.js");
class LeavemessageController {
  async createMessage(ctx) {
    const messageInfo = ctx.request.body;
    const res = await creates(messageInfo);
    if (res === true) {
      ctx.body = {
        code: 0,
        msg: "留言成功",
      };
      return;
    }
    ctx.body = {
      code: 1,
      msg: res,
    };
  }

  async deleteMessage(ctx) {
    // 删除留言
    const deleteQuery = ctx.query;

    const res = await deletes(deleteQuery);
    if (res === true) {
      ctx.body = {
        code: 0,
        msg: "删除评论成功",
      };
      return;
    }
    ctx.body = {
      code: 1,
      msg: res,
    };
  }

  async findMessage(ctx) {
    const findQuery = ctx.query;
    const res = await finds(findQuery);
    if (res.code === 0) {
      ctx.body = {
        code: 0,
        data: res.messageInfo,
      };
      return;
    }
    ctx.body = {
      code: 1,
      msg: res,
    };
  }
}

module.exports = new LeavemessageController();
