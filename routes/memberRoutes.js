const express = require("express");
const Member = require("../models/Member");
const Book = require("../models/Book");
const router = express.Router();

// Add a new member
router.post("/", async (req, res) => {
  try {
    const member = new Member(req.body);
    await member.save();
    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Borrow a book
router.post("/:memberId/borrow/:bookId", async (req, res) => {
  try {
    const member = await Member.findById(req.params.memberId);
    const book = await Book.findById(req.params.bookId);

    if (!member || !book || book.copiesAvailable === 0)
      return res.status(400).json({ message: "Cannot borrow book" });

    book.copiesAvailable -= 1;
    member.borrowedBooks.push(book._id);

    await book.save();
    await member.save();

    res.json({ message: "Book borrowed successfully", member });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
