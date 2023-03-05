const Task = require("../models/taskModels");
const asyncWrap = require("../middlewares/asyncWrap");
const { createCustomError } = require('../errors')

const getAllTasks = asyncWrap(async (req, res) => {
    const tasks = await Task.find({});
    res.status(201).json({ tasks });
});

const getTask = asyncWrap(async (req, res, next) => {
    const { id: taskID } = req.params;
    const task = await Task.findById(taskID);
    if (!task) {
		return next(createCustomError(`Task is not exist with ID ${taskID}`, 404))
    }
    res.status(201).json(task);
});

const addTask = asyncWrap(async (req, res, next) => {
    const { name, completed } = req.body;
    const task = await Task.create({ name, completed });
    if (!task) {
		return next(createCustomError(`Task is not exist with ID ${taskID}`, 404))
    }
    res.status(201).json({ task });
});

const updateTask = asyncWrap(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(201).json(task);
});

const deleteTask = asyncWrap(async (req, res, next) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
		return next(createCustomError(`Task is not exist with ID ${taskID}`, 404))
    }
    res.status(201).json({ msg: "task deleted", task });
});

module.exports = {
    getAllTasks,
    getTask,
    addTask,
    updateTask,
    deleteTask,
};
