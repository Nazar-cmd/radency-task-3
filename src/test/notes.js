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
					response.should.have.status(NOT_FOUND);
					response.body.message.should.be.eq(INVALID_NOTE_ID.message);
					done();
				});
		});
	});

	/**
	 * Test the GET stats route
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

		it("It should NOT POST a note ", (done) => {
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
	 * Test the POST route
	 * */
	/**
	 * Test the PATCH route
	 * */
	/**
	 * Test the DELETE route
	 * */
});
