const main = async connection => {
	await connection.execute('CREATE TABLE IF NOT EXISTS rating (`Id` INT NOT NULL AUTO_INCREMENT, `Rate` INT NOT NULL, `CreatedDT` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`Id`));');
};

exports.main = main;
