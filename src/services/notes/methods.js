import noteSchema from "./noteSchema.js";
import { notes } from "../../repositories/index.js";
import { statusCodes } from "../../helpers/index.js";

const { CREATED, OK } = statusCodes;

const createNote = async (req, res) => {
	const note = req.body;
	const newNote = noteSchema.cast(note);

	const createdNote = await notes.createNote(newNote);

	res.status(CREATED).json({ createdNote });
};

export { createNote };
