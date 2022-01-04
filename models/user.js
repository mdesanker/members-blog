const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, required: true, maxlength: 50 },
  lastName: { type: String, required: true, maxlength: 50 },
  email: { type: String },
  username: { type: String, required: true },
  password: { type: String, required: true, minlength: 7 },
  membership: { type: Boolean, default: false, required: true },
  posts: [{ type: Schema.Types.ObjectId }],
});

// Virtual for full name
UserSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for url
UserSchema.virtual("url").get(function () {
  return "/user/" + this._id;
});

module.exports = mongoose.model("User", UserSchema);
