import { Router } from "express";
import { createNoteService } from "../services/index.js";

const router = Router();

router.get("/");

router.get("/:id/");

router.get("/notes/stats");

router.post("/", createNoteService);

router.delete("/:id/");

router.patch("/:id/");

export default router;
