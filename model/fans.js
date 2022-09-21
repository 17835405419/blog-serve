let mongoose = require('mongoose')

//  粉丝文档对象
let schema = new  mongoose.Schema({
    username:String, //当前用户的对象
    author:String,//关注的作者的对象
    createTime:String //关注的时间

})

let Fans =mongoose.model('fans',schema)

module.exports =Fans