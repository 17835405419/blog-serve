let mongoose = require('mongoose')

//  粉丝文档对象
let schema = new  mongoose.Schema({
    username:String, //点赞的用户
    author:String, //被点赞的作者
    articleTitle:String,//点赞的文章标题
    articleId:Number,  //点赞的文章id
    createTime:String,
})

let Stars =mongoose.model('star',schema)

module.exports =Stars