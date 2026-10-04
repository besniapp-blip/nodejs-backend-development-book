import express from "express";
import { AppError } from "./errors/AppError.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const books = [
  { id: 1, title: "Node.js Backend Development" },
  { id: 2, title: "API Design Notes" },
];

app.get("/api/books/:id", (req, res, next) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return next(new AppError(400, "Book id must be a positive integer."));
  }

  const book = books.find((item) => item.id === id);

  if (!book) {
    return next(new AppError(404, "Book not found."));
  }

  res.json(book);
});

app.get("/api/demo-error", () => {
  // This simulates an unexpected programming or infrastructure error.
  throw new Error("Unexpected demo error");
});

// Keep the 404 middleware after all valid routes.
app.use(notFound);

// Error-handling middleware must be registered last.
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
