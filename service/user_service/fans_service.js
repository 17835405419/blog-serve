const Fans = require("../../model/user_model/fans");
const Users = require("../../model/user_model/users");

// 导入分页函数
const paging = require("../../untils/paging");

class FansService {
  async creates(fansInfo) {
    // 新增关注
    try {
      const { authorId } = fansInfo;
      await Fans.create(fansInfo);
      // 修改作者粉丝数
      const { acknowledged } = await Users.updateOne(
        { authorId: authorId },
        { $inc: { fansNum: 1 } }
      );

      if (acknowledged !== false) {
        return true;
      }
      return "关注失败";
    } catch (error) {
      return error.message;
    }
  }
  async deletes(deleteQuery) {
    try {
      const { authorId, userId } = deleteQuery;
      await Fans.deleteOne({ authorId, userId });
      // 修改文章点赞数
      await Users.updateOne({ authorId: authorId }, { $inc: { fansNum: -1 } });
      return true;
    } catch (error) {
      return error.message;
    }
  }

  async finds(findQuery) {
    try {
      // 定义查询条件
      let query = {};
      findQuery.userId && Object.assign(query, { userId: findQuery.userId });
      findQuery.authorId &&
        Object.assign(query, { authorId: findQuery.authorId });

      // 将query参数合并到 findQuery对象中
      Object.assign(findQuery, { query });
      const fansInfo = await paging(Fans, findQuery);
      if (fansInfo.count === 0) {
        return "查询结果为空";
      }
      return {
        code: 0,
        fansInfo,
      };
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
}

module.exports = new FansService();
