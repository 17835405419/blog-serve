const Article = require("../../model/article_model/article");

async function pageQuery(condition) {
  let { page, pageSize, sortQuery, sortStyle } = condition;

  // 定义查询条件 根据什么查询 {可扩展}
  let query = {};
  condition.articleId &&
    Object.assign(query, { articleId: condition.articleId });
  condition.author && Object.assign(query, { author: condition.author });
  // 判断排序
  let sort = "";
  if (!sortQuery || !sortStyle) {
    // 如果没有传排序方式  默认按时间降序排序
    sort = "-createTime";
  } else if (Number(sortStyle) === 0) {
    sort = `-${sortQuery}`;
  } else {
    sort = sortQuery;
  }

  // 判断页码
  if (!page || isNaN(Number(page))) {
    page = 1;
  } else {
    page = Number(page);
  }

  // 判断每一页显示几条数据
  if (!pageSize || isNaN(Number(pageSize))) {
    // 每页的条数
    pageSize = 10;
  } else {
    pageSize = Number(pageSize);
  }

  // 计算总页数
  const count = await Article.find({ query }).count();
  let totalPage = 0; //总页数
  if (count > 0) {
    //向上取整
    totalPage = Math.ceil(count / pageSize);
  }

  //  判断当前页码的范围
  if (page > 0 && page > totalPage) {
    page = totalPage;
  } else if (page < 1) {
    page = 1;
  }

  // 计算起始位置
  let start = (page - 1) * pageSize;

  // 返回查询结果
  return {
    ArticleInfo: await Article.find(query)
      .sort(sort)
      .skip(start)
      .limit(pageSize),
    count: count,
    page: page,
    pageSize: pageSize,
  };
}

class ArticleService {
  async create(articleInfo) {
    // 发布文章
    return await Article.create(articleInfo);
  }

  async find(condition) {
    //查询文章

    /**
     *  @params page 查询的页数 {可不传 默认一页}
     *          pageSize 每一页显示条数  {可不传 默认十条}
     *          sortQuery 排序参数 根据什么排序
     *          sortStyle 排序方式  {0 为降序 1为升序}
     *
     */

    // 如果是通过文章Id查找的话，该文章浏览量加一

    if (condition.articleId) {
      await Article.updateOne(
        { articleId: condition.articleId },
        { $inc: { "articleHandle.read": 1 } }
      );
    }
    return await pageQuery(condition);
  }

  async update(condition, updateInfo) {
    //更新文章
    let { articleId } = condition;
    // 存放更改的内容
    let doc = {};
    updateInfo.title && Object.assign(doc, { title: updateInfo.title });
    updateInfo.content && Object.assign(doc, { content: updateInfo.content });
    updateInfo.stemfrom &&
      Object.assign(doc, { stemfrom: updateInfo.stemfrom });
    updateInfo.articleImg &&
      Object.assign(doc, { articleImg: updateInfo.articleImg });
    updateInfo.articleState &&
      Object.assign(doc, { articleState: updateInfo.articleState });
    return await Article.updateOne({ articleId }, doc);
  }

  async deletes(condition) {
    // 删除文章
    const { articleId } = condition;
    return await Article.deleteOne({ articleId });
  }
}

module.exports = new ArticleService();
