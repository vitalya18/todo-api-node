const express = require('express');
const config = require('./config.json');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger-output.json');

const app = express();

async function initDb()
{
	try {
		console.log('DB:\t try connect')
		await mongoose.connect(
			`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true
		});
		console.log('DB:\t connection successful');
	} catch (e) {
		console.error(`DB (error):\t ${e.message}`);
	}
}

(async () => {
	console.log('SERVER:\t start');
	await initDb();

	app.use(express.urlencoded({extended: true}));
	app.use(express.json());
	app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
	app.use('/task', require('./routing/task-route'));

	app.listen(config.server.port, () => {
		console.log(`SERVER:\t listen http://localhost:${config.server.port}`);
	});
})();