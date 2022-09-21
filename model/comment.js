let mongoose = require('mongoose')

// 文章评论文档对象
let schema = new mongoose.Schema({
   username:String, //评论的用户
   author:String, //被评论的作者
   articleTitle:String,//评论的文章标题
   articleId:Number,  //评论的文章id
   content:String,
   createTime:String,
   avater:String   
})

let Comment= mongoose.model('comments',schema)

module.exports =Comment