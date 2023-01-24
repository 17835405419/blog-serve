const Article = require("../../model/article_model/article");

// 导入分页函数
const paging = require("../../untils/paging");

class ArticleService {
  async create(articleInfo) {
    // 发布文章
    try {
      await Article.create(articleInfo);
      return true;
    } catch (error) {
      return error.message;
    }
  }

  async find(condition) {
    //查询文章
    try {
      // 如果是通过文章Id查找的话，该文章浏览量加一
      if (condition.articleId) {
        await Article.updateOne(
          { articleId: condition.articleId },
          { $inc: { "articleHandle.read": 1 } }
        );
      }
      // 添加查询条件
      let query = {};
      condition.articleId &&
        Object.assign(query, { articleId: condition.articleId }); //文章id查找
      condition.authorId &&
        Object.assign(query, { authorId: condition.authorId }); //作者id查找
      condition.articlPartName &&
        Object.assign(query, { articlPartName: condition.articlPartName }); //分区查找

      condition.tagName &&
        Object.assign(query, {
          showTagList: { $elemMatch: { $eq: condition.tagName } },
        }); //标签查询 可拓展
      // 将查询条件添加至 codition中

      Object.assign(condition, { query });

      const articleInfo = await paging(Article, condition);

      if (articleInfo.count === 0) {
        return "查询结果为空";
      }
      return {
        code: 0,
        articleInfo,
      };
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async update(updateInfo) {
    try {
      //更新文章
      let { articleId } = updateInfo;

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

      const { acknowledged } = await Article.updateOne({ articleId }, doc);

      if (acknowledged !== false) {
        return true;
      }
      return "更新失败";
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async deletes(condition) {
    // 删除文章
    try {
      const { articleId, userId } = condition;
      // 如果作者Id与前端回传的用户Id一致 表示为作者本人操作则可执行删除操作
      const res = await Article.deleteOne({
        articleId: articleId,
        authorId: userId,
      });
      if (res.deletedCount !== 0) {
        return true;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }

    return;
  }
}

module.exports = new ArticleService();
