const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  copiesAvailable: { type: Number, required: true, default: 1 }
});

module.exports = mongoose.model("Book", bookSchema);
