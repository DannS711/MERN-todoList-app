const express = require("express");
const TaskController = require("../controllers/taskController");
const router = express.Router();

// Task CRUD route
router.post("/create/:_id", TaskController.createTask);
router.get("/tasks/:_id", TaskController.getTaskByListId);
router.patch("/rewrite/:_id", TaskController.rewriteTask);
router.patch("/status/:_id", TaskController.changeTaskStatus);
router.delete("/delete/:_id", TaskController.deleteTask);

module.exports = router;
