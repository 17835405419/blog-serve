let Banner = require("../model/banner");

class BannerService {
  async create(bannerInfo) {
    try {
      await Banner.create(bannerInfo);
      return true;
    } catch (error) {
      console.log(error.name);
    }
  }
  async find() {
    return await Banner.find();
  }
}

module.exports = new BannerService();
