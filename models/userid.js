const mongoose = require("mongoose");

//schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: String,
  password: String,
});

//model
const User = mongoose.model("User", UserSchema);

module.exports = User;
