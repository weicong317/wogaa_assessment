const express = require('express');
const router = express.Router();
const questions = require('../services/questions');
const helper = require('../helper');

router.get('/', async (req, res, next) => {
	try {
		res.json(await questions.getAllActive());
	} catch (err) {
		next(err);
	}
});

router.get('/:questionId', async (req, res, next) => {
	try {
		if (isNaN(req.params.questionId)) {
			helper.badRequest();
		}
		res.json(await questions.getSpecific(req.params.questionId));
	} catch (err) {
		next(err);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const { question, type, placeHolder, min, max, step } = req.body;
		if (!question || !type) {
			helper.badRequest();
		}
		res.status(201).json(await questions.addQuestion(question, type, placeHolder || null, min || null, max || null, step || null));
	} catch (err) {
		next(err);
	}
});

router.put('/:questionId', async (req, res, next) => {
	try {
		const { question, placeHolder, min, max, step } = req.body;
		if (isNaN(req.params.questionId) || !question) {
			helper.badRequest();
		}
		res.json(await questions.updateQuestion(req.params.questionId, question, placeHolder || null, min || null, max || null, step || null));
	} catch (err) {
		next(err);
	}
});

router.delete('/:questionId', async (req, res, next) => {
	try {
		if (isNaN(req.params.questionId)) {
			helper.badRequest();
		}
		res.json(await questions.removeQuestion(req.params.questionId));
	} catch (err) {
		next(err);
	}
});

module.exports = router;
