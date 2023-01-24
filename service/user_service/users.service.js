// 导入插件
const md5 = require("md5"); //md5加密
// 导入用户模型
let Users = require("../../model/user_model/users");

class UserService {
  async create(userInfo) {
    try {
      // 用户注册
      // 密码加密
      Object.assign(userInfo, { passWord: md5(userInfo.passWord) });
      await Users.create(userInfo);
      return true;
    } catch (error) {
      return error.message;
    }
  }
  async find(userInfo, condition = {}) {
    /**
     * @findConditon  根据哪些用户信息查询用户
     * @condition  需要返回那些数据 默认为空    字段名：1  返回该数据 ； 0 则不返回
     */
    try {
      let findConditon = {};
      userInfo.userName &&
        Object.assign(findConditon, { userName: userInfo.userName });
      userInfo.userId &&
        Object.assign(findConditon, { userId: userInfo.userId });
      const res = await Users.find(findConditon, condition);
      return res;
    } catch (error) {
      return error.message;
    }
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
    // 特殊处理 js隐式转换 0默认为 false 会导致doc获取不到性别数据
    (userInfo.sex === 0 || 1 || 2) && Object.assign(doc, { sex: userInfo.sex });
    userInfo.desc && Object.assign(doc, { desc: userInfo.desc });
    if (userInfo.isDisable && ctx.role === "SUPERADMIN") {
      userInfo.isDisable &&
        Object.assign(doc, { isDisable: userInfo.isDisable }); //是否禁用 这需要超级管理员权限
    }
    console.log(doc);
    return await Users.updateOne(condition, doc);
  }
}

module.exports = new UserService();
