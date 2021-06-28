export class ErrorWithCode extends Error {
	statusCode = 500;

	constructor(name, statusCode, message) {
		super(message);
		this.name = name;
		this.statusCode = statusCode;
	}
}

export default ErrorWithCode;
