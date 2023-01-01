const mongoose = require("mongoose");

//用户对象
let schema = new mongoose.Schema({
  userId: {
    type: Number,
    default: Date.now,
    unique: true,
  },
  userName: {
    type: Number,
    required: true,
    minlength: 9,
    maxlength: 9, //限制为九位数数字
  }, //用户名
  passWord: {
    type: String,
    required: true,
    select: false,
    minlength: 6,
    maxlength: 15,
  }, //密码  默认不显示
  nickName: {
    type: String,
    default: "默认用户",
  }, //用户名
  avater: {
    type: String,
    default: "",
  }, //头像
  sex: {
    type: Number,
    default: 0, // 0 男生 1女生
  }, //性别
  desc: {
    type: String,
    default: "",
  }, //  用户的信息描述
  fansNum: {
    type: Number,
    default: 0,
  }, //作者粉丝数

  // phone: {
  //   type: Number,
  //   default: null,
  // }, //手机号

  // 邮箱
  email: {
    emailNum: {
      type: String,
      default: "",
    }, //邮箱号
    emailCode: {
      type: Number,
      minlength: 4,
      maxlength: 4,
      default: null,
    }, //验证码
  },
  role: {
    type: String,
    default: "ORDINARYUSER",
    select: false,
  }, //角色权限
  isDisable: {
    type: Number,
    default: 0,
  }, //是否禁用 0正常 1禁用(封禁)

  createTime: {
    type: Number,
    default: Date.now,
  }, //创建时间
});
let Users = mongoose.model("users", schema);

module.exports = Users;
