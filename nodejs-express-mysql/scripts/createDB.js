const mysql = require('mysql2/promise');
require('dotenv').config();

const main = async () => {
	const connection = await mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
	});
	await connection.execute(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`);
	await connection.end();
};

exports.main = main;
