const LeaveMessage = require("../../model/web_model/leaveMessage");
// 导入分页函数
const paging = require("../../untils/paging");
class LeaveMessageService {
  async creates(messageInfo) {
    // 新增评论
    try {
      await LeaveMessage.create(messageInfo);
      return true;
    } catch (error) {
      return error.message;
    }
  }
  async deletes(deleteQuery) {
    try {
      const { messageId } = deleteQuery;

      await LeaveMessage.deleteOne({ messageId });
      return true;
    } catch (error) {
      return error.message;
    }
  }

  async finds(findQuery) {
    try {
      const messageInfo = await paging(LeaveMessage, findQuery);
      if (messageInfo.count === 0) {
        return "查询结果为空";
      }
      return {
        code: 0,
        messageInfo,
      };
    } catch (error) {
      return error.message;
    }
  }
}

module.exports = new LeaveMessageService();
