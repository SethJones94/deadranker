const mongoose = require("mongoose");
const Video = mongoose.model("Video");

exports.addPageGET = (req, res) => {
  res.render("add", {});
};

// TODO - Make the createVideo post request work
// TODO - the current issue is that I need to add a description field
// TODO - and connect the youtube api search prediction
exports.createVideo = async (req, res) => {
  const video = new Video(req.body);
  await video.save();
  res.redirect("/");
};
