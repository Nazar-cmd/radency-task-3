import _state from "./_state.js";
import { errors } from "../../helpers/index.js";

export class NotesRepo {
	#notes = [];

	constructor(initialNotes) {
		this.#notes = initialNotes;
	}

	async createNote(newNote) {
		this.#notes.push(newNote);
		return newNote;
	}

	async getAllNotes() {
		return this.#notes;
	}

	async getNote(index) {
		this.indexValidation(index);
		return this.#notes[index];
	}

	async deleteNote(index) {
		this.indexValidation(index);
		return this.#notes.splice(index, 1)[0];
	}

	async updateNote(index, newNote) {
		this.indexValidation(index);
		const oldNote = this.#notes[index];
		const note = {
			...oldNote,
			...newNote
		};
		this.#notes[index] = note;

		return note;
	}

	indexValidation(index) {
		if (index > this.#notes.length - 1) {
			throw errors.INVALID_NOTE_ID;
		}
	}
}

export default new NotesRepo(_state.notes);
