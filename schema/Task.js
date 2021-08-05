const mongoose = require('mongoose');

const Task = mongoose.model('Task', new mongoose.Schema({
	content: String,
	date: { type: Date, default: Date.now }
}));

module.exports = Task;