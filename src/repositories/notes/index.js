import _state from "./_state.js";

class Notes {
	#notes = [];

	constructor(initialNotes) {
		this.#notes = initialNotes;
	}

	async createNote(newNote) {
		this.#notes.push(newNote);
	}

	async getAllNotes() {
		return this.#notes;
	}

	async getNote(index) {
		return this.#notes[index];
	}

	async deleteNote(index) {
		return this.#notes.splice(index, 1);
	}

	async updateNote(index, newNote) {
		const oldNote = this.#notes[index];
		const note = {
			...oldNote,
			...newNote
		};
		this.#notes[index] = note;

		return note;
	}
}

export default new Notes(_state.notes);
