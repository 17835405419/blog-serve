let Stars = require('../model/star')
let Article = require("../model/article");
/**
 * 点赞api
 */

 const add = async (ctx) => {
    let star = ctx.request.body;
    let {articleId} =star
    // 记录点赞状态
    let isStar = false;
    await Stars.create(star)
      .then((rel) => {
        if (rel) {
          isStar = true
          ctx.body = {
            code: 200,
            msg: "点赞成功"
          };
        } else {
          ctx.body = {
            code: 300,
            msg: "点赞失败",
          };
        }
      })
      .catch((err) => {
        ctx.body = {
          code: 500,
          msg: "点赞异常",
        };
      });
     
      if (isStar == true) {
          await Article.updateOne({articleId},{$inc:{star:1}}) 
      }
  };



/**
 * 后台点赞查询 根据作者查询
 */
 const findByAuthor =async ctx =>{
    let {page,author} =ctx.query
    if (!page || isNaN(Number(page))) {
      page = 1;
    } else {
      page = Number(page);
    }
    // 每页的条数
    let pagesize = 10;
  
    // 计算总页数
    let count = 0; //总条数
    await Stars.find({ author })
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
    await Stars.find({ author })
      .skip(start)
      .limit(pagesize)
      .then((rel) => {
        if (rel && rel.length > 0) {
          ctx.body = {
            code: 200,
            msg: "点赞查询成功",
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
  }

module.exports = {
    add,
    findByAuthor
}