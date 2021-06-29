import statusCodes from "./statusCodes.js";
import ErrorWithCode from "./ErrorWithCode.js";

const { NOT_FOUND } = statusCodes;

const INVALID_NOTE_ID = new ErrorWithCode(
	"INVALID_NOTE_ID",
	NOT_FOUND,
	"There is no note with such index"
);

export default { INVALID_NOTE_ID };
