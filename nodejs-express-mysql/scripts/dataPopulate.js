const main = async connection => {
	await connection.execute('INSERT INTO question (Question, Type, PlaceHolder, Min, Max, Step) SELECT * FROM (SELECT \'What did you like most?\' AS q, \'short\' AS t, \'answer please\' AS ph, null AS min, null AS max, null AS step UNION SELECT \'What did you like least?\' AS q, \'linear\' AS t, null AS ph, 0 AS min, 16 AS max, 2 AS step UNION SELECT \'Your email\' AS q, \'email\' AS t, \'email please\' AS ph, null AS min, null AS max, null AS step) a WHERE NOT EXISTS (SELECT * FROM question);');
};

exports.main = main;