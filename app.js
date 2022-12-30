const Koa = require("koa");
const app = new Koa();
const json = require("koa-json");
const { cors, mongoConnect, bodyParser } = require("./config/config");
const autherror = require("./middleware/auth.error");
const router = require("./routes");

mongoConnect(); //连接数据库
app.use(cors()); //跨域
app.use(bodyParser()); //处理post参数

// // middlewares中间件
// 中间件 处理错误请求 用户验证失败的相关信息返回给浏览器
app.use(autherror());

// 处理json数据
app.use(json());

app.use(router.routes(), router.allowedMethods()); //注册路由

module.exports = app;
