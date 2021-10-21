const main = async connection => {
	await connection.execute('CREATE TABLE IF NOT EXISTS editedquestion (`Id` INT NOT NULL AUTO_INCREMENT, `OriginalQuestionID` INT NOT NULL, `OriginalQuestion` VARCHAR(255) NOT NULL, `OriginalMin` int DEFAULT NULL, `OriginalMax` int DEFAULT NULL, `CreatedDT` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`Id`));');
};

exports.main = main;
