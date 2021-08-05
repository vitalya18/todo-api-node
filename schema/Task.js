const mongoose = require('mongoose');

/**
 * @swagger
 * definitions:
 *  Task:
 *   type: object
 *   required:
 *   - content
 *   properties:
 *    content:
 *     type: string
 *     example: Walk with dog
 *    date:
 *     type: Date
 *     default: Current date
 *     example: 2021-08-04T11:36:40.235+00:00
 *     info: Not send, always set default
 */

const Task = mongoose.model('Task', new mongoose.Schema({
	content: String,
	date: { type: Date, default: Date.now }
}));

module.exports = Task;