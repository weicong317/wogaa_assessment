const unknownPath = () => {
	const error = new Error('Not Found');
	error.statusCode = 404;

	throw error;
};

const badRequest = () => {
	const error = new Error('Parameters missing or wrong parameters');
	error.statusCode = 400;

	throw error;
};

module.exports = {
	unknownPath,
	badRequest,
};
