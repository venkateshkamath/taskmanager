const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
//custom error Handlers

const { CustomAPIError, createCustomError } = require("../errors/custom-error");
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({}); //leaving empty gives us all the task.
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(200).json({ task });
});
const getTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (task) {
    return res.status(200).json({ task });
  }
  return next(createCustomError("Not found", 404));
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  // res.status(200).json({ id: taskID, data: req.body });
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (task) {
    return res.status(200).json({ task });
  }
  return next(createCustomError("Not found", 404));
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findByIdAndDelete({ _id: taskID });
  if (task) {
    return res.status(200).json({ task });
  }
  return next(createCustomError("Not found", 404));
});

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
