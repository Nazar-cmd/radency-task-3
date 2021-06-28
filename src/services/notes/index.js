import noteSchema from "./noteSchema.js";
import { createNote } from "./methods.js";
import { validationMiddleware, withCatch } from "../../helpers/index.js";

const createNoteService = [
	validationMiddleware(noteSchema),
	withCatch(createNote)
];

export { createNoteService };
