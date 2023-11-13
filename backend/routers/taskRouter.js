const express = require("express");
const TaskListController = require("../controllers/listController");
const TaskController = require("../controllers/taskController");
const router = express.Router();

// Task CRUD route
router.post("/create/:_id", TaskController.createTask)
router.get("/tasks/:_id", TaskController.getTaskByListId)
router.patch("/rewrite/:_id", TaskController.rewriteTask)
router.delete("/", TaskController)

module.exports = router