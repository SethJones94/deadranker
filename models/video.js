const mongoose = require("mongoose");
mongoose.promise = global.Promise;
const slug = require("slug");

const videoSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Please enter a song/album name"
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  tags: [String]
});

module.exports = mongoose.model("Video", videoSchema);
