const express = require("express");
const TaskListController = require("../controllers/taskListController");
const router = express.Router();

// List CRUD route
router.post("/create", TaskListController.createNewList);
router.get("/lists", TaskListController.readUserList);
router.patch("/rename/:_id", TaskListController.renameList);
router.delete("/delete/:_id", TaskListController.deleteList)

// Task CRUD route
router.post("/", TaskListController)
router.get("/tasks/:_id", TaskListController.getTaskByListId)
router.put("/", TaskListController)
router.delete("/", TaskListController)

module.exports = router;
