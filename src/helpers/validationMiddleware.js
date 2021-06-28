const validationMiddleware = (schema) => async (req, res, next) => {
	const { note } = req.body;

	try {
		await schema.validate(note);
		next();
		return next();
	} catch (error) {
		return res.status(400).json({ error });
	}
};

export default validationMiddleware;
