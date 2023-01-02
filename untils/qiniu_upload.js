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
// 生成上传token
const uploadToken = putPolicy.uploadToken(mac);
//构建上传配置
const config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = QINIU_CONFIG.ZONE;

// 构建上传操作对象
const formUploader = new qiniu.form_up.FormUploader(config);
const putExtra = new qiniu.form_up.PutExtra();

// 构建资源管理操作对象
const bucketManager = new qiniu.rs.BucketManager(mac, config);
// 上传空间
const bucket = QINIU_CONFIG.BUCKET;

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

const qnDelete = (key) => {
  return new Promise((resolve, reject) => {
    bucketManager.delete(bucket, key, (err, respBody, respInfo) => {
      if (err) {
        reject(err);
      } else {
        resolve(respBody);
      }
    });
  });
};

module.exports = {
  qnUpload,
  qnDelete,
};
