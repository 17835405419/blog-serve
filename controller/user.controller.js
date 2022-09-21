// 导入插件
const { md5 } = require("../config/config");
// 派发token
const { sign } = require("../middleware/auth");
const { create, find } = require("../service/users.service");

class UserController {
  async register(ctx) {
    // 用户注册
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
        // condition 需要返回那些数据 //默认为空   字段名：1 返回该数据
        let condition = { userName: 1, passWord: 1 };
        const res = await find({ userName, passWord }, condition);
        // 验证是否相等
        if (userName === res[0].userName && md5(passWord) === res[0].passWord) {
          // 配发 token
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
}

module.exports = new UserController();

// // 用户登录
// const login = async (ctx) => {
//   let { username, pwd } = ctx.request.body;

//   await Users.findOne({ username, pwd })
//     .then((rel) => {
//       if (rel) {
//         let token = jwt.sign(
//           {
//             username: rel.username,
//             _id: rel._id,
//           },
//           "jianshu-serve-jwt",
//           {
//             expiresIn: "2h",
//           }
//         );
//         ctx.body = {
//           code: 200,
//           msg: "登陆成功",
//           token,
//           rel,
//         };
//       } else {
//         ctx.body = {
//           code: 300,
//           msg: "用户名或密码错误",
//         };
//       }
//     })
//     .catch((err) => {
//       ctx.body = {
//         code: 500,
//         msg: "登录时出现异常",
//         err,
//       };
//     });
// };

// /**
//  * 用户注册
//  */
// const reg = async (ctx) => {
//   let { username, pwd } = ctx.request.body;

//   let isExistence = false;
//   await Users.findOne({ username }).then((rel) => {
//     if (rel) isExistence = true;
//   });

//   if (isExistence) {
//     ctx.body = {
//       code: 300,
//       msg: "该用户已经存在",
//     };
//     return;
//   }

//   await Users.create({ username, pwd })
//     .then((rel) => {
//       if (rel) {
//         ctx.body = {
//           code: 200,
//           msg: "注册成功",
//         };
//       } else {
//         ctx.body = {
//           code: 300,
//           msg: "注册失败",
//         };
//       }
//     })
//     .catch((err) => {
//       ctx.body = {
//         code: 500,
//         msg: "注册时出现异常",
//         err,
//       };
//     });
// };

// //验证用户登录
// const verify = async (ctx) => {
//   let token = ctx.header.authorization;
//   token = token.replace("Bearer ", "");

//   try {
//     let reuslt = jwt.verify(token, "jianshu-serve-jwt");
//     await Users.findOne({ _id: reuslt._id })
//       .then((rel) => {
//         if (rel) {
//           ctx.body = {
//             code: 200,
//             msg: "用户认证成功",
//             user: rel,
//           };
//         } else {
//           ctx.body = {
//             code: 500,
//             msg: "用户认证失败",
//           };
//         }
//       })
//       .catch((err) => {
//         ctx.body = {
//           code: 500,
//           msg: "用户认证失败",
//         };
//       });
//   } catch (error) {
//     ctx.body = {
//       code: 500,
//       msg: "用户认证失败",
//     };
//   }
// };

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

// /**
//  * 修改用户资料的方法
//  */
// const updatePersonal = async (ctx) => {
//   let user = ctx.request.body;
//   await Users.updateOne(
//     { _id: user._id },
//     {
//       username: user.username,
//       avater: user.avater,
//       sex: user.sex,
//       desc: user.desc,
//       phone: user.phone,
//       email: user.email,
//     }
//   )
//     .then((rel) => {
//       if (rel.modifiedCount > 0) {
//         ctx.body = {
//           code: 200,
//           msg: "信息修改成功",
//         };
//       } else {
//         ctx.body = {
//           code: 300,
//           msg: "信息修改失败",
//         };
//       }
//     })
//     .catch((err) => {
//       ctx.body = {
//         code: 500,
//         msg: "修改时出现错误",
//       };
//     });
// };

// module.exports = {
//   reg,
//   login,
//   verify,
//   updataPwd,
//   updatePersonal,
// };
