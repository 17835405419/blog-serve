let mongoose = require("mongoose");

//  粉丝文档对象
let schema = new mongoose.Schema({
  username: {
    type: Number,
    required: true,
  }, //当前用户
  author: {}, //关注的作者
  createTime: String, //关注的时间
});

let Fans = mongoose.model("fans", schema);

module.exports = Fans;
