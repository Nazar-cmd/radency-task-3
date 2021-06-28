import { Router } from "express";
import {
	createNoteService,
	getStatsService,
	updateNoteService,
	deleteNoteService,
	getNotesService,
	getNoteService
} from "../services/notes/index.js";

const router = Router();

router.get("/", getNotesService);

router.get("/stats/", getStatsService);

router.get("/:id/", getNoteService);

router.post("/", createNoteService);

router.delete("/:id/", deleteNoteService);

router.patch("/:id/", updateNoteService);

export default router;
