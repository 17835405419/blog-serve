let mongoose = require("mongoose");

let schema = new mongoose.Schema({
  messageId: {
    type: Number,
    default: Date.now,
  },
  userId: {
    type: Number,
    required: true,
  }, //评论的用户ID
  nickName: {
    type: String,
    required: true,
  }, //评论的用户昵称
  avater: {
    type: String,
    required: true,
  }, //评论的用户头像
  content: {
    type: String,
    required: true,
  }, //评论内容
  createTime: {
    type: Number,
    default: Date.now,
  }, //评论时间
});

let leaveMessage = mongoose.model("leaveMessage", schema);

module.exports = leaveMessage;
