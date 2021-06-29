import chai from "chai";
import chaiHttp from "chai-http";

import { statusCodes, errors, getCurrentDate } from "../helpers/index.js";
import server from "../index.js";

const { OK, CREATED, BAD_REQUEST, NOT_FOUND } = statusCodes;
const { INVALID_NOTE_ID } = errors;

// Assertion Style
chai.should();

chai.use(chaiHttp);

describe("Notes API", () => {
	/**
	 * Test the GET route
	 * */
	describe("GET /notes", () => {
		it("It should GET all the notes", (done) => {
			chai
				.request(server)
				.get("/notes")
				.end((err, response) => {
					response.should.have.status(OK);
					response.body.should.be.a("array");
					response.body.length.should.be.eq(8);
					done();
				});
		});

		it("It should NOT GET all the notes", (done) => {
			chai
				.request(server)
				.get("/note")
				.end((err, response) => {
					response.should.have.status(NOT_FOUND);
					done();
				});
		});
	});

	/**
	 * Test the GET (by id) route
	 * */

	describe("GET /notes/:id/", () => {
		it("It should GET a note by ID", (done) => {
			const noteId = 1;
			chai
				.request(server)
				.get(`/notes/${noteId}/`)
				.end((err, response) => {
					response.should.have.status(OK);
					response.body.should.be.a("object");
					response.body.should.have.property("name");
					response.body.should.have.property("category");
					response.body.should.have.property("content");
					response.body.should.have.property("archived");
					response.body.should.have.property("created");
					done();
				});
		});

		it("It should NOT GET a note by ID", (done) => {
			const noteId = 123;
			chai
				.request(server)
				.get(`/notes/${noteId}/`)
				.end((err, response) => {
					response.should.have.status(INVALID_NOTE_ID.statusCode);
					// response.body.message.should.be.eq(INVALID_NOTE_ID.message);
					done();
				});
		});
	});

	/**
	 * Test the GET stats route
	 * */

	describe("GET /notes/stats/", () => {
		it("It should GET a notes stats", (done) => {
			chai
				.request(server)
				.get("/notes/stats/")
				.end((err, response) => {
					response.should.have.status(OK);
					response.body.should.be.a("array");
					done();
				});
		});

		it("It should NOT GET a notes stats", (done) => {
			chai
				.request(server)
				.get("/notes/stats/1")
				.end((err, response) => {
					response.should.have.status(NOT_FOUND);
					done();
				});
		});
	});

	/**
	 * Test the POST route
	 * */

	describe("POST /notes", () => {
		it("It should POST a note", (done) => {
			const note = {
				name: "OLX",
				content: "To sell my giraffes",
				category: "Idea"
			};
			chai
				.request(server)
				.post("/notes")
				.send({ note })
				.end((err, response) => {
					response.should.have.status(CREATED);
					response.body.should.be.a("object");
					response.body.should.have.property("name").eq("OLX");
					response.body.should.have.property("category").eq("Idea");
					response.body.should.have.property("archived").eq(false);
					response.body.should.have.property("created").eq(getCurrentDate());
					response.body.should.have
						.property("content")
						.eq("To sell my giraffes");
					done();
				});
		});

		it("It should NOT POST a note without the name property", (done) => {
			const note = {
				content: "To sell my giraffes",
				category: "Idea"
			};
			chai
				.request(server)
				.post("/notes")
				.send({ note })
				.end((err, response) => {
					response.should.have.status(BAD_REQUEST);
					response.body.error.message.should.be.eq("name is a required field");
					response.body.error.type.should.be.eq("required");
					done();
				});
		});

		it("It should NOT POST a note with this category", (done) => {
			const note = {
				name: "OLX",
				content: "To sell my giraffes",
				category: "Think"
			};
			chai
				.request(server)
				.post("/notes")
				.send({ note })
				.end((err, response) => {
					response.should.have.status(BAD_REQUEST);
					response.body.error.type.should.be.eq("oneOf");
					response.body.error.message.should.be.eq(
						"category must be one of the following values: Idea, Quote, Task, Random Thought"
					);
					done();
				});
		});
	});

	/**
	 * Test the PATCH route
	 * */

	describe("PATCH /notes/:id/", () => {
		it("It should PATCH a note with changed name, content, category", (done) => {
			const id = 1;
			const note = {
				name: "DIVAN",
				content: "To sell my thoughts",
				category: "Quote"
			};
			chai
				.request(server)
				.patch(`/notes/${id}/`)
				.send({ note })
				.end((err, response) => {
					response.should.have.status(CREATED);
					response.body.should.be.a("object");
					response.body.should.have.property("name").eq("DIVAN");
					response.body.should.have.property("category").eq("Quote");
					response.body.should.have.property("archived").eq(false);
					response.body.should.have
						.property("content")
						.eq("To sell my thoughts");
					done();
				});
		});

		it("It should PATCH a note with changed 'archived' property", (done) => {
			const id = 1;
			const note = {
				name: "DIVAN",
				content: "To sell my thoughts",
				category: "Quote",
				archived: true
			};
			chai
				.request(server)
				.patch(`/notes/${id}/`)
				.send({ note })
				.end((err, response) => {
					response.should.have.status(CREATED);
					response.body.should.be.a("object");
					response.body.should.have.property("name").eq("DIVAN");
					response.body.should.have.property("category").eq("Quote");
					response.body.should.have.property("archived").eq(true);
					response.body.should.have
						.property("content")
						.eq("To sell my thoughts");
					done();
				});
		});

		it("It should NOT PATCH a note with not bool 'archived property'", (done) => {
			const id = 1;
			const note = {
				name: "DIVAN",
				content: "To sell my thoughts",
				category: "Quote",
				archived: "t"
			};
			chai
				.request(server)
				.patch(`/notes/${id}/`)
				.send({ note })
				.end((err, response) => {
					response.should.have.status(BAD_REQUEST);
					response.body.error.type.should.be.eq("typeError");
					response.body.error.message.should.be.eq(
						'archived must be a `boolean` type, but the final value was: `"t"`.'
					);
					done();
				});
		});

		/*		it("It should NOT PATCH a note with this ID", (done) => {
			const id = 11;
			const note = {
				name: "DIVAN",
				content: "To sell my thoughts",
				category: "Quote",
				archived: true
			};
			chai
				.request(server)
				.patch(`/notes/${id}/`)
				.send({ note })
				.end((err, response) => {
					response.should.have.status(INVALID_NOTE_ID.statusCode);
					done();
				});
		}); */
	});

	/**
	 * Test the DELETE route
	 * */

	describe("DELETE /notes/:id/", () => {
		it("It should DELETE a note", (done) => {
			const id = 1;
			chai
				.request(server)
				.delete(`/notes/${id}`)
				.end((err, response) => {
					response.should.have.status(OK);
					response.body.should.be.a("object");
					response.body.should.have.property("name");
					response.body.should.have.property("category");
					response.body.should.have.property("archived");
					response.body.should.have.property("created");
					response.body.should.have.property("content");
					done();
				});
		});

		it("It should NOT DELETE a note without the name property", (done) => {
			const id = 11;
			chai
				.request(server)
				.delete(`/notes/${id}`)
				.end((err, response) => {
					response.should.have.status(errors.INVALID_NOTE_ID.statusCode);
					done();
				});
		});
	});
});
