const express = require("express");
const Book = require("../models/Book");
const router = express.Router();

// Add a new book
router.post("/", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all books
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Get a book by ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a book
router.put("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a book
router.delete("/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
