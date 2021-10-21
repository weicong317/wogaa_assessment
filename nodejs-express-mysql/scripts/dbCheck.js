const mysql = require('mysql2/promise');
const createDB = require('./createDB');
const createQuestionTB = require('./createQuestionTB');
const createRatingTB = require('./createRatingTB');
const createResponseTB = require('./createResponseTB');
const createEditedQuestionTB = require('./createEditedQuestionTB');
const dataPopulate = require('./dataPopulate');
require('dotenv').config();

const main = async () => {
	await createDB.main();

	const connection = await mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
	});
	await createQuestionTB.main(connection);
	await createRatingTB.main(connection);
	await createResponseTB.main(connection);
	await createEditedQuestionTB.main(connection);
	await dataPopulate.main(connection);
	await connection.end();
};

main();
