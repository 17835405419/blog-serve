const { create, find } = require("../service/banner.service");
class BannerController {
  async createBanner(ctx) {
    try {
      const bannerInfo = ctx.request.body;
      await create(bannerInfo);
      ctx.body = {
        code: 0,
        msg: "上传轮播图成功",
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getBanner(ctx) {
    try {
      const res = await find();
      ctx.body = {
        code: 0,
        msg: "获取轮播图成功",
        bannerLists: res,
      };
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new BannerController();
