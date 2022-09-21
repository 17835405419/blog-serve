let mongoose =require('mongoose')
let schema = new mongoose.Schema({
    id:Number,
    img:String
})

let Banner = mongoose.model('banners',schema)

module.exports =Banner