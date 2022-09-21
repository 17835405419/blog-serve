let Users = require("../model/users");
const md5 = require("md5");

class UserService {
  async create(userInfo) {
    // 用户注册
    // 密码加密
    Object.assign(userInfo, { passWord: md5(userInfo.passWord) });
    await Users.create(userInfo);
  }
  async find(userInfo, condition) {
    /**
     * userInfo  需要传对象
     * condition  需要返回那些数据 默认为空    字段名：1  返回该数据 0不返回
     */
    return await Users.find(
      {
        userName: userInfo.userName,
      },
      condition
    );
  }
}

module.exports = new UserService();
