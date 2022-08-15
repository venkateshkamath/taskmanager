const router = require("express").Router();
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask,
} = require("../controllers/tasks.js");
router.route("/").get(getAllTasks).post(createTask);

router.route("/:id").get(getTask).delete(deleteTask).patch(updateTask);

module.exports = router;
