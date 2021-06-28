import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import errorHandler from "api-error-handler";
import { notes } from "./routes/index.js";

dotenv.config();

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/notes", notes);

app.use(errorHandler());
export default app.listen(PORT, () => {
	console.log(`server has been started on port ${PORT} ...`);
});
