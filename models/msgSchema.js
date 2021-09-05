const mongoose = require("mongoose");

const { Schema } = mongoose;

const messageSchema = new Schema({
  user: String,
  msg: String,
  projectID: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", messageSchema);
