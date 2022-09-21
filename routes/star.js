const{
    add,
    findByAuthor
   }=require('../controller/star')
   
   const router = require('koa-router')()
   router.prefix('/star')
   
   // 点赞作者api
   router.post('/add',add)
   
   //查询点赞
   router.get('/find',findByAuthor)
   module.exports =router