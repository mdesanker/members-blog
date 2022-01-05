const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now() },
  content: { type: String, required: true },
});

// Virtual for date formatted
PostSchema.virtual("date_formatted").get(function () {
  const day = DateTime.fromJSDate(this.date).toLocaleString(
    DateTime.DATE_SHORT
  );
  const time = DateTime.fromJSDate(this.date).toLocaleString(
    DateTime.TIME_SIMPLE
  );
  return `${time}, ${day}`;
});

// Virtual for post url
PostSchema.virtual("url").get(function () {
  return "/post/" + this._id;
});

module.exports = mongoose.model("Post", PostSchema);
