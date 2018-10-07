var express = require('express');
var router = express.Router();
var task = require('../../controllers/api/TasksController.js');

router.get('/', task.index);
router.get('/:id', task.show);
router.post('/', task.create);
router.patch('/:id', task.update);
router.delete('/:id', task.delete);

module.exports = router;
