var express = require('express');
var router = express.Router();
const { validate } = require('../utils/router');

var taskController = require('../controllers/TaskController');

router.post('/', validate(taskController.validate('create')), taskController.create);
router.get('/', taskController.getAll);
router.get('/:task', taskController.get);
router.post('/:task/', validate(taskController.validate('edit')), taskController.edit);
router.delete('/:task/', taskController.remove);

module.exports = router;