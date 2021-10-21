const main = async connection => {
	await connection.execute('CREATE TABLE IF NOT EXISTS question (`Id` int NOT NULL AUTO_INCREMENT, `Question` varchar(255) NOT NULL, `Type` varchar(10) NOT NULL, `PlaceHolder` varchar(255) DEFAULT NULL, `Min` int DEFAULT NULL, `Max` int DEFAULT NULL, `Step` int DEFAULT NULL, `DelStatus` tinyint NOT NULL DEFAULT \'0\', `CreatedDT` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `ModifiedDT` datetime DEFAULT NULL, PRIMARY KEY (`Id`));');
};

exports.main = main;