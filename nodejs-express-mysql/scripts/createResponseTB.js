const main = async connection => {
	await connection.execute('CREATE TABLE IF NOT EXISTS response (`Id` INT NOT NULL AUTO_INCREMENT, `RatingId` INT NOT NULL, `QuestionId` INT NOT NULL, `EditedQuestionId` INT NULL, `Answer` VARCHAR(255) NOT NULL, PRIMARY KEY (`Id`, `RatingId`));');
};

exports.main = main;
