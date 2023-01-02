let mongoose = require("mongoose");
let schema = new mongoose.Schema({
  bannerId: {
    type: Number,
    default: Date.now,
  },
  imgUrl: {
    type: String,
    required: true,
    default: "",
  },
  href: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    default: "",
  },
});

let Banner = mongoose.model("banners", schema);

module.exports = Banner;
