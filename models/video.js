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

videoSchema.pre("save", function(next) {
  //only runs if name is modified
  if (!this.isModified("name")) {
    next();
    return;
  }
  this.slug = slug(this.name);
  next();

  //Make unique slugs - todo
});
module.exports = mongoose.model("Video", videoSchema);
