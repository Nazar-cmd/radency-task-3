import noteSchema from "./noteSchema.js";
import { withValidation, statusCodes } from "../../helpers/index.js";

const { CREATED, OK } = statusCodes;

const addNoteService = (req, res) => {
	const note = req.body;
	const newNote = noteSchema.cast(note);

	res.status(CREATED).json({ newNote });
};

const createNoteServiceWithValidation = withValidation(
	noteSchema,
	addNoteService
);

export { createNoteServiceWithValidation };
