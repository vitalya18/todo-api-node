const swaggerJSDoc = require('swagger-jsdoc');
const fs = require('fs');

const swaggerDefinition = {
	info: {
		title: "Simple rest api for todo app",
		version: "1.0.0",
		contact: {
			name: "Vitalya",
			email: "vitalya18@icloud.com"
		},
	},
};

const options = {
  swaggerDefinition,
  apis: ["./schema/*", "./controllers/*"],
};

let docs = swaggerJSDoc(options);
fs.writeFile('swagger-output.json', JSON.stringify(docs), function(err, result) {
	if(err) console.log('error', err);
});