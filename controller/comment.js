let Comment = require("../model/comment");
let Article = require("../model/article");

/**
 * 添加评论api
 */

const add = async (ctx) => {
  let comment = ctx.request.body;
  let id =Number(comment.articleId);    
  // 记录评论状态
  let isComment = false;
  await Comment.create(comment)
    .then((rel) => {
      if (rel) {
        isComment = true;
        ctx.body = {
          code: 200,
          msg: "发布评论成功",
          id:id
        };
      } else {
        ctx.body = {
          code: 300,
          msg: "发布评论失败",
        };
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "发布评论异常",
      };
    });

  if (isComment == true) {
    await Article.updateOne({id}, { $inc: {comment: 1 } });
  }
};

/**
 * 前台查询接口
 */
const findById = async (ctx) => {
  let { articleId,page } = ctx.query;
  if (!page || isNaN(Number(page))) {
    page = 1;
  } else {
    page = Number(page);
  }
  // 每页的条数
  let pagesize = 10;

  // 计算总页数
  let count = 0; //总条数
  await Comment.find( {articleId} )
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
  let start = (page - 1) * pagesize;
  await Comment.find({articleId})
    .skip(start)
    .limit(pagesize)
    .sort({createTime:-1})
    .then((rel) => {
      if (rel && rel.length > 0) {
        ctx.body = {
          code: 200,
          msg: "评论查询成功",
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

/**
 * 后台评论查询 根据作者查询
 */
const findByAuthor = async (ctx) => {
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
  await Comment.find({ author })
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
  await Comment.find({ author })
    .skip(start)
    .limit(pagesize)
    .then((rel) => {
      if (rel && rel.length > 0) {
        ctx.body = {
          code: 200,
          msg: "评论查询成功",
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
  add,
  findById,
  findByAuthor,
};
