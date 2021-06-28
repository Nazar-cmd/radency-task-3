import noteSchema from "./noteSchema.js";
import { validationMiddleware, statusCodes } from "../../helpers/index.js";
import { notes } from "../../repositories/index.js";

const { CREATED, OK } = statusCodes;

const createNote = async (req, res) => {
	const note = req.body;
	const newNote = noteSchema.cast(note);

	const createdNote = await notes.createNote(newNote);

	res.status(CREATED).json({ createdNote });
};

// prettier-ignore
const withCatch =	(fn) => (...args) => fn(...args).catch(args[2]);

const createNoteService = [
	validationMiddleware(noteSchema),
	withCatch(createNote)
];

export { createNoteService };
