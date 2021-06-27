import { Router } from "express";
// eslint-disable-next-line import/named
import { addNoteServiceWithValidation } from "../services/notes/index.js";

const router = Router();

router.get("/");

router.get("/:id/");

router.get("/notes/stats");

router.post("/", addNoteServiceWithValidation);

router.delete("/:id/");

router.patch("/:id/");

export default router;
