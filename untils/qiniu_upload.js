const { QINIU_CONFIG } = require("../config/config.Item");
const qiniu = require("qiniu"); //导入七牛云sdk

// 生成上传凭证
const mac = new qiniu.auth.digest.Mac(
  QINIU_CONFIG.ACCESSKEY,
  QINIU_CONFIG.SECRETKEY
);
const options = {
  scope: QINIU_CONFIG.BUCKET,
};
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);
//
const config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = QINIU_CONFIG.ZONE;

const formUploader = new qiniu.form_up.FormUploader(config);
const putExtra = new qiniu.form_up.PutExtra();

/**
 *
 * @param {*} key 上传文件名
 * @param {*} localFile 流文件
 * @returns
 */
const qnUpload = (key, localFile) => {
  // 文件上传
  return new Promise((resolved, reject) => {
    // 以文件流的形式进行上传
    // uploadToken是token， key是上传到七牛后保存的文件名, localFile是流文件
    // putExtra是上传的文件参数，采用源码中的默认参数
    formUploader.putStream(
      uploadToken,
      key,
      localFile,
      putExtra,
      (respErr, respBody, respInfo) => {
        if (respErr) {
          reject(respErr);
        } else {
          resolved(respBody);
        }
      }
    );
  });
};

module.exports = {
  qnUpload,
};
