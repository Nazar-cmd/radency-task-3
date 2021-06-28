import yup from "yup";
import { getCurrentDate } from "../../helpers/index.js";

const listOfCategories = ["Idea", "Quote", "Task", "Random Thought"];

const noteSchema = yup.object({
	name: yup.string().required(),
	content: yup.string().required(),
	archived: yup.boolean().default(false),
	created: yup.string().default(getCurrentDate()),
	category: yup.string().oneOf(listOfCategories).required()
});

export default noteSchema;
