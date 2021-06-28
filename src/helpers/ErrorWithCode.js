class ErrorWithCode extends Error {
	statusCode = 404;

	constructor(name, statusCode, message) {
		super(message);
		this.name = name;
		this.statusCode = statusCode;
	}
}

export default ErrorWithCode;
