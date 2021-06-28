import { validationMiddleware, withCatch } from "../../helpers/index.js";
import noteSchema from "./noteSchema.js";
import {
	createNote,
	updateNote,
	getStats,
	getNote,
	deleteNote,
	getNotes
} from "./methods.js";

const getNotesService = [withCatch(getNotes)];

const getNoteService = [withCatch(getNote)];

const getStatsService = [withCatch(getStats)];

const createNoteService = [
	validationMiddleware(noteSchema),
	withCatch(createNote)
];

const updateNoteService = [
	validationMiddleware(noteSchema),
	withCatch(updateNote)
];

const deleteNoteService = [withCatch(deleteNote)];

export {
	createNoteService,
	getNoteService,
	getNotesService,
	deleteNoteService,
	updateNoteService,
	getStatsService
};
