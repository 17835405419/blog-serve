let mongoose = require("mongoose");

//  粉丝文档对象
let schema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  }, //当前用户Id
  nickName: {
    type: String,
    required: true,
  }, //当前用户昵称
  authorId: {
    type: Number,
    required: true,
  }, //关注的作者Id
  authorName: {
    type: String,
    required: true,
  }, //作者名
  createTime: {
    type: Number,
    default: Date.now,
  }, //关注的时间
});

let Fans = mongoose.model("fans", schema);

module.exports = Fans;
