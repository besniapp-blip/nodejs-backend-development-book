import { Router } from "express";
import {
  createBook,
  getBookById,
  listBooks,
} from "../controllers/bookController.js";

const router = Router();

router.get("/", listBooks);
router.get("/:id", getBookById);
router.post("/", createBook);

export default router;
