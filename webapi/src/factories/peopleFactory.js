const PeopleRepository = require('../repositories/peopleRepository');
const PeopleService = require('../services/peopleService');
const { join } = require('path');
const filename = join(__dirname, '../../database', 'data.json');

const generateInstance = () => {
	const peopleRepository = new PeopleRepository({
		file: filename,
	});
	const peopleService = new PeopleService({
		peopleRepository,
	});

	return peopleService;
};

module.exports = { generateInstance };

generateInstance().find().then(console.log);
