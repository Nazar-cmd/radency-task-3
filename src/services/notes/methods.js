import noteSchema from "./noteSchema.js";
import { notesRepo } from "../../repositories/index.js";
import { statusCodes } from "../../helpers/index.js";

const { CREATED, OK } = statusCodes;

const getNotes = async (req, res) => {
	const notes = await notesRepo.getAllNotes();

	res.status(CREATED).json({ notes });
};

const getNote = async (req, res) => {
	const { id } = req.params;

	const note = await notesRepo.getNote(id);

	res.status(CREATED).json({ note });
};

const getStats = async (req, res) => {
	console.log("asdddddddddd");
	const notes = await notesRepo.getAllNotes();

	const categories = [...new Set(notes.map((note) => note.category).sort())];

	const stats = categories.map((categoryName) => {
		const activeQuantity = notes.filter(
			(note) => note.category === categoryName && !note.archived
		).length;
		const archivedQuantity = notes.filter(
			(note) => note.category === categoryName && note.archived
		).length;

		return {
			name: categoryName,
			archivedQuantity,
			activeQuantity
		};
	});

	res.status(CREATED).json({ stats });
};

const createNote = async (req, res) => {
	const { note } = req.body;
	const newNote = noteSchema.cast(note);

	const createdNote = await notesRepo.createNote(newNote);

	res.status(CREATED).json({ createdNote });
};

const deleteNote = async (req, res) => {
	const { id } = req.params;

	const deletedNote = await notesRepo.deleteNote(id);

	res.status(CREATED).json({ deletedNote });
};

const updateNote = async (req, res) => {
	const { note } = req.body;
	const { id } = req.params;

	const updatedNote = await notesRepo.updateNote(id, note);

	res.status(CREATED).json({ updatedNote });
};

export { getNotes, createNote, deleteNote, updateNote, getNote, getStats };
