const router = require("koa-router")();
router.prefix("/banner");
const {
    upload, 
    setBanner,
    getBanners
} =require('../controller/banner')
// 首页轮播图上传接口
router.post("/img", upload.single("bannerImg"),setBanner);

//获取轮播图
router.get('/find',getBanners)
module.exports = router;
