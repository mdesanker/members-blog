const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now() },
  content: { type: String, required: true },
});

// Virtual for post url
PostSchema.virtual("url").get(function () {
  return "/post/" + this._id;
});

module.exports = mongoose.model("Post", PostSchema);
