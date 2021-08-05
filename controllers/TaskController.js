const Task = require('../schema/Task');
const { body } = require('express-validator');

module.exports = {
	validate: function(action) {
		if (action == 'create' || action == 'edit')
			return [
				body('content').isLength({ min: 5 }),
			];
	},

	/**
	 * @swagger
	 * /task:
	 *  post:
	 *    description: Create new task
	 *    consumes:
	 *    - application/json
	 *    produces:
	 *    - application/json
	 *    parameters:
	 *    - in: body
	 *      name: Task
	 *      schema:
	 *        $ref: '#/definitions/Task'
	 *    responses:
	 *        200:
	 *            description: It's ok and task created
	 *        400:
	 *            description: It's bad request
	 *        500:
	 *            description: It's internal server error
    */
	create: async function(req, res, next) {
		Task.create({
			content: req.body.content
		});

		res.status(200).send({'status': 'OK'});
	},
	/**
	 * @swagger
	 * /task/{id}:
	 *  get:
	 *    description: Get task by id
	 *    consumes:
	 *    - application/json
	 *    produces:
	 *    - application/json
	 *    parameters:
	 *    - in: path
	 *      type: string
	 *      name: id
	 *      description: Id of task
	 *      required: true,
	 *    responses:
	 *        200:
	 *            description: Return task by id
	 *            schema:
	 *             $ref: '#/definitions/Task'
	 *        400:
	 *            description: It's bad request
	 *        500:
	 *            description: It's internal server error
    */
	get: async function(req, res, next) {
		res.status(200).send({'task': await Task.findById(req.params.task)});
	},
	/**
	 * @swagger
	 * /task:
	 *  get:
	 *    description: Get all task
	 *    consumes:
	 *    - application/json
	 *    produces:
	 *    - application/json
	 *    responses:
	 *        200:
	 *            description: Return all task
	 *            schema:
	 *             type: array
	 *             items:
	 *              $ref: '#/definitions/Task'
	 *        400:
	 *            description: It's bad request
	 *        500:
	 *            description: It's internal server error
    */
	getAll: async function(req, res, next) {
		res.status(200).send(await Task.find());
	},
	/**
	 * @swagger
	 * /task/{id}:
	 *  post:
	 *    description: Edit existing task
	 *    consumes:
	 *    - application/json
	 *    produces:
	 *    - application/json
	 *    parameters:
	 *    - in: path
	 *      type: string
	 *      name: id
	 *      description: Id of task
	 *      required: true,
	 *    - in: body
	 *      name: Task
	 *      schema:
	 *        $ref: '#/definitions/Task'
	 *    responses:
	 *        200:
	 *            description: Return updated task
	 *            schema:
	 *             $ref: '#/definitions/Task'
	 *        400:
	 *            description: It's bad request
	 *        500:
	 *            description: It's internal server error
    */
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
	/**
	 * @swagger
	 * /task/{id}:
	 *  delete:
	 *    description: Remove task by id
	 *    consumes:
	 *    - application/json
	 *    produces:
	 *    - application/json
	 *    parameters:
	 *    - in: path
	 *      type: string
	 *      name: id
	 *      description: Id of task
	 *      required: true,
	 *    responses:
	 *        200:
	 *            description: Success removed
	 *        400:
	 *            description: It's bad request
	 *        500:
	 *            description: It's internal server error
    */
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