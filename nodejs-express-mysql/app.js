const express = require('express');
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helper = require('./helper');
require('dotenv').config();

const port = process.env.PORT || 3000;

const questionsRouter = require('./routes/questions');
const ratingRouter = require('./routes/rating');
const responseRouter = require('./routes/response');

const app = express();
app.set('port', port);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/questions', questionsRouter);
app.use('/rating', ratingRouter);
app.use('/response', responseRouter);

app.get('*', helper.unknownPath);
app.post('*', helper.unknownPath);
app.put('*', helper.unknownPath);
app.delete('*', helper.unknownPath);

app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const errorMessage = err.message || 'Server Error';
	res.status(statusCode).json({ message: errorMessage });

	return;
});

const server = http.createServer(app);
server.listen(port);
