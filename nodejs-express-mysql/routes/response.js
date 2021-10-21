const express = require('express');
const router = express.Router();
const response = require('../services/response');
const helper = require('../helper');

router.get('/', async (req, res, next) => {
	try {
		res.json(await response.getAll());
	} catch (err) {
		next(err);
	}
});

router.get('/:responseId', async (req, res, next) => {
	try {
		if (isNaN(req.params.responseId)) {
			helper.badRequest();
		}
		res.json(await response.getSpecific(req.params.responseId));
	} catch (err) {
		next(err);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const { rateId, survey } = req.body;
		if (!rateId || !Array.isArray(survey) || isNaN(rateId)) {
			helper.badRequest();
		}
		survey.forEach(qa => {
			if (isNaN(qa[0])) {
				helper.badRequest();
			}
		});
		res.status(201).json(await response.addReponse(rateId, survey));
	} catch (err) {
		next(err);
	}
});

module.exports = router;
