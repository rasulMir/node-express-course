const express = require('express')
const router = express.Router()

const {
	getAllTasks,
	getTask,
	addTask,
	updateTask,
	deleteTask
} = require('../controller/tasksController')

router.route('/tasks').get(getAllTasks).post(addTask)
router.route('/tasks/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router