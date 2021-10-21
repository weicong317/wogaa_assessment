const db = require('./db');

const getSpecific = async id => {
	const data = await db.query('SELECT Id, Question, Type, PlaceHolder, Min, Max, Step FROM question WHERE Id = ?', [id]);
	return { data };
};

const getAllActive = async () => {
	const data = await db.query('SELECT Id, Question, Type, PlaceHolder, Min, Max, Step FROM question WHERE DelStatus = 0');
	return { data };
};

const addQuestion = async (newQuestion, newType, newPlaceHolder, newMin, newMax, newStep) => {
	const data = await db.query('INSERT INTO question (Question, Type, PlaceHolder, Min, Max, Step) VALUES (?, ?, ?, ?, ?, ?)', [newQuestion, newType, newPlaceHolder, newMin, newMax, newStep]);
	return {
		data: {
			message: 'Question added',
			newID: data.insertId,
		},
	};
};

const updateQuestion = async (id, updatedQuestion, updatedPlaceHolder, updatedMin, updatedMax, updatedStep) => {
	const originalQuestion = await getSpecific(id);
	await db.query('UPDATE question SET Question = ?, PlaceHolder = ?, Min = ?, Max = ?, Step = ?, ModifiedDT = CURRENT_TIMESTAMP() WHERE Id = ?', [updatedQuestion, updatedPlaceHolder, updatedMin, updatedMax, updatedStep, id]);
	const data = await db.query('INSERT INTO editedquestion (OriginalQuestionID, OriginalQuestion, OriginalMin, OriginalMax) VALUES (?, ?, ?, ?);', [id, originalQuestion.data[0].Question, originalQuestion.data[0].Min, originalQuestion.data[0].Max]);
	await db.query('UPDATE response SET EditedQuestionId = ? WHERE QuestionId = ? AND ISNULL(EditedQuestionId) OR EditedQuestionId = \'\'', [data.insertId, id]);
	return {
		data: {
			message: 'Question updated',
		},
	};
};

const removeQuestion = async id => {
	const data = await db.query('UPDATE question SET DelStatus = 1, ModifiedDT = CURRENT_TIMESTAMP() WHERE Id = ? AND DelStatus = 0', [id]);
	if (data.affectedRows === 1) {
		return {
			data: {
				message: 'Question deleted',
			},
		};
	} else {
		return {
			data: {
				message: 'Question is not existing',
			},
		};
	}
};

module.exports = {
	getSpecific,
	getAllActive,
	addQuestion,
	updateQuestion,
	removeQuestion,
};
