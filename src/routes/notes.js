import { Router } from "express";
import { createNoteServiceWithValidation } from "../services/index.js";

const router = Router();

router.get("/");

router.get("/:id/");

router.get("/notes/stats");

router.post("/", createNoteServiceWithValidation);

router.delete("/:id/");

router.patch("/:id/");

export default router;
