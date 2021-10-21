const mysql = require('mysql2/promise');

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	waitForConnections: true,
	connectionLimit: 2,
	queueLimit: 0,
	debug: false,
});

const query = async (sql, params) => {
	const [rows, fields] = await pool.execute(sql, params);

	return rows;
};

module.exports = {
	query,
};
