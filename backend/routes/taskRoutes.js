const taskController = require('../controllers/taskController')
const express = require('express')
const router = express.Router()

router.route('/').get(taskController.getAllTasksController)
router.route('/').post(taskController.createTaskController)
router.route('/:taskId/complete').put(taskController.completeTaskController)
router.route('/:taskId').put(taskController.updateTaskController)
router.route('/:taskId').delete(taskController.deleteTaskController)

module.exports = router