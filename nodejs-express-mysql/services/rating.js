const db = require('./db');

const getSpecific = async id => {
	const data = await db.query('SELECT Id, Rate FROM rating WHERE Id = ?', [id]);
	return { data };
};

const getAll = async () => {
	const data = await db.query('SELECT Id, Rate FROM rating');
	return { data };
};

const addRating = async newRating => {
	const data = await db.query('INSERT INTO rating (Rate) VALUES (?)', [newRating]);
	return {
		data: {
			message: 'Rating added',
			newID: data.insertId,
		},
	};
};

module.exports = {
	getSpecific,
	getAll,
	addRating,
};
