// 一些插件可变配置项
const qiniu = require("qiniu");
module.exports = {
  // jwt相关
  jwtItem: {
    secret: "jianshu-serve-jwt", //jwt加密秘钥
    expiresIn: "2h", //token过期时间
  },
  // 七牛云上传配置
  QINIU_CONFIG: {
    ACCESSKEY: "4qHZaK8ItQ9GFr9kfHM2cUsEiPl5J9PHydVcGHlt",
    SECRETKEY: "fU_stp9coHT8h0_Fi7UCL9PK9sNfd_0oUb7LK8DL",
    BUCKET: "zwq-blog", //要上传的空间名
    ZONE: qiniu.zone.Zone_z2, //机房名称
    DOMAIN_NAME: "http://rnla1fx0j.hn-bkt.clouddn.com/", //测试域名
  },
};
