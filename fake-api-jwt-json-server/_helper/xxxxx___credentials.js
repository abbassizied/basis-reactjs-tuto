/*
Access-Control-Allow-Credentials is a header that, when set to true, tells browsers to expose the response to the frontend JavaScript code.



*/

const allowedOrigins = require('../config/allowedOrigins');

const credentials = (req, res, next) => {
	const origin = req.headers.origin;
	if (allowedOrigins.includes(origin)) {
		res.header('Access-Control-Allow-Credentials', true);
	}
	next();
};

module.exports = credentials;