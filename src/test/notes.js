import chai from "chai";
import chaiHttp from "chai-http";

import { statusCodes } from "../helpers/index.js";
import server from "../index.js";

const { OK, CREATED, BAD_REQUEST, NOT_FOUND } = statusCodes;

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
	/**
	 * Test the GET stats route
	 * */
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
