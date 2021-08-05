const Task = require('../schema/Task');
const { body, validationResult } = require('express-validator');

module.exports = {
	validate: function(action) {
		if (action == 'create' || action == 'edit')
			return [
				body('content').isLength({ min: 5 }),
			];
	},

	create: async function(req, res, next) {
		Task.create({
			content: req.body.content
		});

		res.status(200).send({'status': 'OK'});
	},
	get: async function(req, res, next) {
		res.status(200).send({'task': await Task.findById(req.params.task)});
	},
	getAll: async function(req, res, next) {
		res.status(200).send(await Task.find());
	},
	edit: async function(req, res, next) {

		let task = null;

		try
		{
			task = await Task.findByIdAndUpdate(req.params.task, {
				content: req.body.content
			}, { new: true });
		} catch (e) {
			return res.status(400).json({ error: e.message });
		}

		if (task == null)
			return res.status(400).json({ errors: {
				'param': 'id',
				'msg': 'Not found',
			}});

		res.status(200).send({'status': 'OK', 'task': task});
	},
	remove: async function(req, res, next) {

		let task = null;
		try
		{
			task = await Task.findByIdAndDelete(req.params.task);
		} catch (e) {
			return res.status(400).json({ error: e.message });
		}

		if (task == null)
			return res.status(400).json({ errors: {
				'param': 'id',
				'msg': 'Not found',
			}});

		res.status(200).send({'status': 'OK'});
	}
}