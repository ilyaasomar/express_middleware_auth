import express from "express";
import {
  createTransection,
  deleteTransection,
  getSingleTransSection,
  getTransections,
} from "../controller/transections.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/", getTransections);
router.post("/", auth, createTransection);
router.get("/:id", auth, getSingleTransSection);
router.delete("/:id", auth, deleteTransection);

export default router;
