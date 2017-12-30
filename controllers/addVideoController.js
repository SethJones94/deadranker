const mongoose = require("mongoose");
const Video = mongoose.model("Video");

exports.addPageGET = (req, res) => {
  res.render("add", {});
};

// TODO - Make the createVideo post request work
// TODO - the current issue is that I need to add a description field
// TODO - and connect the youtube api search prediction
exports.createVideo = async (req, res) => {
  const video = await new Video(req.body).save();
  req.flash("sucess", "Added VideoName");
  await video.save();
  res.redirect("/");
};
