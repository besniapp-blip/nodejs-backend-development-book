import { books, getNextBookId } from "../data/books.js";

export function listBooks(req, res) {
  res.json({
    count: books.length,
    data: books,
  });
}

export function getBookById(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      message: "Book id must be a positive integer.",
    });
  }

  const book = books.find((item) => item.id === id);

  if (!book) {
    return res.status(404).json({
      message: "Book not found.",
    });
  }

  res.json(book);
}

export function createBook(req, res) {
  const { title, author } = req.body;

  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({
      message: "Title must be a non-empty string.",
    });
  }

  if (typeof author !== "string" || author.trim() === "") {
    return res.status(400).json({
      message: "Author must be a non-empty string.",
    });
  }

  const newBook = {
    id: getNextBookId(),
    title: title.trim(),
    author: author.trim(),
  };

  books.push(newBook);

  res.status(201).json(newBook);
}
