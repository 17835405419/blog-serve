// 导入插件
const md5 = require("md5"); //md5加密
// 导入用户模型
let Users = require("../model/users");

class UserService {
  async create(userInfo) {
    // 用户注册
    // 密码加密
    Object.assign(userInfo, { passWord: md5(userInfo.passWord) });
    await Users.create(userInfo);
  }
  async find(userInfo, condition = {}) {
    /**
     * @userInfo  根据哪些用户信息查询用户
     * @condition  需要返回那些数据 默认为空    字段名：1  返回该数据 ； 0 则不返回
     */
    return await Users.find(
      {
        userName: userInfo.userName,
      },
      condition
    );
  }
  async update(userInfo, condition) {
    /***
     * 可更新的内容
     *
     */
    let doc = {};
    userInfo.nickName && Object.assign(doc, { nickName: userInfo.nickName });
    userInfo.passWord && Object.assign(doc, { passWord: userInfo.passWord });
    userInfo.emailNum &&
      Object.assign(doc, { "email.emailNum": userInfo.emailNum });
    userInfo.avater && Object.assign(doc, { avater: userInfo.avater });
    userInfo.sex && Object.assign(doc, { sex: userInfo.sex });
    userInfo.isDisable && Object.assign(doc, { isDisable: userInfo.isDisable }); //是否禁用

    return await Users.updateOne(condition, doc);
  }
}

module.exports = new UserService();
