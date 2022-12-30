// 导入插件
// const { md5 } = require("../config/config");
const md5 = require("md5");
// 派发token
const { sign, verifyOne } = require("../middleware/auth");
// 服务层调用
const { create, find, update } = require("../service/users.service");

class UserController {
  async register(ctx) {
    // 用户注册 ---  待完成 短信验证  + redis数据库缓存
    try {
      const userInfo = ctx.request.body;
      if (!userInfo.userName || !userInfo.passWord) {
        ctx.body = {
          code: 1,
          msg: "用户名或密码为必传",
        };
      } else {
        await create(userInfo);
        ctx.body = {
          code: 0,
          msg: "注册成功",
        };
      }
    } catch (error) {
      console.log(error);
    }
  }
  async login(ctx) {
    // 登录
    try {
      const { userName, passWord } = ctx.request.body;
      if (!userName || !passWord) {
        ctx.body = {
          code: 1,
          msg: "用户名或密码为必传",
        };
      } else {
        // condition 需要返回那些数据  字段名：1  返回该数据
        let condition = { userName: 1, passWord: 1 };
        const res = await find({ userName }, condition);
        // 验证是否相等
        if (userName === res[0].userName && md5(passWord) === res[0].passWord) {
          // 派发token
          const token = sign({ userName: res[0].userName });
          ctx.body = {
            code: 0,
            msg: "登陆成功",
            token: token,
          };
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getUserInfo(ctx) {
    // 获取用户信息
    try {
      const res = await find({ userName: ctx.userName });
      ctx.body = {
        code: 0,
        msg: "信息获取成功",
        userInfo: res[0],
      };
    } catch (error) {
      console.log(error);
    }
  }
  async updateUserInfo(ctx) {
    // 更新用户信息
    try {
      const userInfo = ctx.request.body;
      const { acknowledged } = await update(userInfo, {
        userName: ctx.userName,
      });
      if (acknowledged) {
        ctx.body = {
          code: 0,
          msg: "更新成功",
        };
      } else {
        ctx.body = {
          code: 1,
          msg: "更新失败",
        };
      }
    } catch (error) {
      console.log(error);
    }
  }
  async updataPwd(ctx) {
    // 修改密码
    try {
      const { oldPassWord, newPassWord } = ctx.request.body;
      let condition = { passWord: 1 }; //定义查询条件 只需返回密码即可
      const res = await find({ userName: ctx.userName }, condition);
      console.log(res);
      // if (oldPassWord === newPassWord) {
      //   ctx.body = {
      //     code: 1,
      //     msg: "新旧密码相同",
      //   };
      //   return;
      // }

      // await update({ userName: ctx.userName }, {});
    } catch (error) {
      console.log(error);
    }
  }
  async refreshToken(ctx, userName) {
    // 获取上传的旧token
    // 解析token
    try {
      const { oldToken } = ctx.request.body;
      const res = verifyOne(oldToken);
    } catch (e) {
      if (e.message === "jwt expired") {
        const newToken = sign({ userName });
        // // 调用node的response对象  将新的token发送给前端
        ctx.res.setHeader("authorization", newToken);
        ctx.body = {
          code: 0,
          msg: "刷新token成功",
          token: newToken,
        };
      }
    }
  }
}

module.exports = new UserController();

// // 修改用户密码
// const updataPwd = async (ctx) => {
//   let { username, pwd } = ctx.request.body;

//   await Users.updateOne(
//     { username }, //查询条件
//     { pwd } //要更改的内容
//   )
//     .then((rel) => {
//       ctx.body = {
//         rel: rel,
//       };
//       if (rel.modifiedCount > 0) {
//         ctx.body = {
//           code: 200,
//           msg: "密码修改成功",
//         };
//       } else if (rel.modifiedCount == 0) {
//         ctx.body = {
//           code: 300,
//           msg: "新旧密码重复",
//         };
//       } else {
//         ctx.body = {
//           code: 300,
//           msg: "密码修改错误",
//         };
//       }
//     })
//     .catch((err) => {
//       ctx.body = {
//         code: 500,
//         msg: "修改时出现异常",
//       };
//     });
// };
