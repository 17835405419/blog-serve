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
  }, //密码  默认不显示
  nickName: {
    type: String,
    default: "默认用户" + Math.round(Math.random() * 1000), //随机生成1000以内的整数
  }, //用户名
  avater: {
    type: String,
    default:
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg3.doubanio.com%2Fview%2Fgroup_topic%2Fl%2Fpublic%2Fp515017570.jpg&refer=http%3A%2F%2Fimg3.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1678161681&t=8cfe486b864889c7850d7de0026c296e",
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
