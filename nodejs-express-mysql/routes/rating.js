const express = require('express');
const router = express.Router();
const rating = require('../services/rating');
const helper = require('../helper');

router.get('/', async (req, res, next) => {
	try {
		res.json(await rating.getAll());
	} catch (err) {
		next(err);
	}
});

router.get('/:rateId', async (req, res, next) => {
	try {
		if (isNaN(req.params.rateId)) {
			helper.badRequest();
		}
		res.json(await rating.getSpecific(req.params.rateId));
	} catch (err) {
		next(err);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const { rate } = req.body;
		if (!rate || isNaN(rate)) {
			helper.badRequest();
		}
		res.status(201).json(await rating.addRating(rate));
	} catch (err) {
		next(err);
	}
});

module.exports = router;
