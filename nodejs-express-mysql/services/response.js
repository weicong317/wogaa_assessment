const db = require('./db');

const getSpecific = async id => {
	const data = await db.query('SELECT r.Id, RatingId, QuestionId, EditedQuestionId, Answer, CASE WHEN (ISNULL(eq.OriginalQuestion) || eq.OriginalQuestion = \'\') THEN Question ELSE eq.OriginalQuestion END AS Question, q.Type, CASE WHEN (ISNULL(eq.OriginalMin) || eq.OriginalMin = \'\') THEN Min ELSE eq.OriginalMin END AS Min, CASE WHEN (ISNULL(eq.OriginalMax) || eq.OriginalMax = \'\') THEN Max ELSE eq.OriginalMax END AS Max FROM response r INNER JOIN question q ON q.Id = r.QuestionId LEFT JOIN editedquestion eq ON eq.Id = r.EditedQuestionId WHERE r.Id = ?', [id]);
	return { data };
};

const getAll = async () => {
	const data = await db.query('SELECT r.Id, RatingId, QuestionId, EditedQuestionId, Answer, CASE WHEN (ISNULL(eq.OriginalQuestion) || eq.OriginalQuestion = \'\') THEN Question ELSE eq.OriginalQuestion END AS Question, q.Type, CASE WHEN (ISNULL(eq.OriginalMin) || eq.OriginalMin = \'\') THEN Min ELSE eq.OriginalMin END AS Min, CASE WHEN (ISNULL(eq.OriginalMax) || eq.OriginalMax = \'\') THEN Max ELSE eq.OriginalMax END AS Max FROM response r INNER JOIN question q ON q.Id = r.QuestionId LEFT JOIN editedquestion eq ON eq.Id = r.EditedQuestionId');
	return { data };
};

const addReponse = async (rateId, survey) => {
	let sql = 'INSERT INTO response (Answer, RatingId, QuestionId) VALUES ';
	const inputArray = [];
	for (let i = 0; i < survey.length; i++) {
		if (i !== 0) {
			sql += ',';
		}
		sql += '(?, ?, ?)';
		inputArray.push(survey[i][1], rateId, survey[i][0]);
	}
	await db.query(sql, inputArray);
	return {
		data: {
			message: 'Response added',
		},
	};
};

module.exports = {
	getSpecific,
	getAll,
	addReponse,
};
