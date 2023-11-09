const express = require("express");
const ListController = require("../controllers/listController");
const router = express.Router();

// List CRUD route
router.post("/create", ListController.createNewList);
router.get("/lists", ListController.readUserList);
router.patch("/rename/:_id", ListController.renameList);
router.delete("/delete/:_id", ListController.deleteList)


module.exports = router;
