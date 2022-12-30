class ArticleFansController {
  async follow(ctx) {
    // 关注作者接口
    try {
      const fansInfo = ctx.request.body;
      await create(fansInfo);
      ctx.body = {
        code: 0,
        msg: "关注作者成功",
      };
    } catch (error) {
      console.log(error);
    }
  }

  async upfollow(ctx) {
    // 取消关注接口
    try {
      let fansInfo = ctx.request.body;
    } catch (error) {
      console.log(error);
    }
  }
}

/**
 * 粉丝取关接口
 */

const upfollow = async (ctx) => {
  let { username, author } = ctx.request.body;
  await Fans.findOneAndDelete({ username, author })
    .then((rel) => {
      if (rel) {
        ctx.body = {
          code: 200,
          msg: "取消关注成功",
        };
      } else {
        ctx.body = {
          code: 300,
          msg: "取消关注失败",
        };
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "取消关注异常",
        err,
      };
    });
};

/**
 * 查询粉丝
 */

const findAll = async (ctx) => {
  let { page, author } = ctx.query;

  if (!page || isNaN(Number(page))) {
    page = 1;
  } else {
    page = Number(page);
  }
  // 每页的条数
  let pagesize = 10;

  // 计算总页数
  let count = 0; //总条数
  await Fans.find({ author })
    .count()
    .then((rel) => {
      count = rel;
    });
  let totalPage = 0;
  if (count > 0) {
    //    向上取整
    totalPage = Math.ceil(count / pagesize);
  }
  //  判断当前页码的范围
  if (page > 0 && page > totalPage) {
    page = totalPage;
  } else if (page < 1) {
    page = 1;
  }
  //   skip 是查询的起始位置  limit 是每页要查询多少条数据
  // 计算起始位置
  let start = (page - 1) / pagesize;
  await Fans.find({ author })
    .skip(start)
    .limit(pagesize)
    .then((rel) => {
      if (rel && rel.length > 0) {
        ctx.body = {
          code: 200,
          msg: "粉丝查询成功",
          result: rel,
          page, //当前页码
          pagesize, //每页条数
          count, //总条数
        };
      } else {
        ctx.body = {
          code: 300,
          msg: "无查询结果",
        };
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "查询结果异常",
      };
    });
};
module.exports = {
  upfollow,
  findAll,
};
