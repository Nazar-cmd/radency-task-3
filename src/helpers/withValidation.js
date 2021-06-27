const withValidation = (schema, service) => async (req, res, next) => {
	const { body } = req;

	try {
		await schema.validate(body);
		next();
		return service(req, res, next);
	} catch (error) {
		return res.status(400).json({ error });
	}
};

export default withValidation;
