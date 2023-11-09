const express = require("express");
const TaskListController = require("../controllers/listController");
const TaskController = require("../controllers/taskController");
const router = express.Router();

// Task CRUD route
router.post("/create/:_id", TaskController.createTask)
router.get("/tasks/:_id", TaskController.getTaskByListId)
router.put("/", TaskController)
router.delete("/", TaskController)

module.exports = router