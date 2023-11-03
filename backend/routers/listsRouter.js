const express = require("express");
const ListController = require("../controllers/listController");
const router = express.Router();

router.post("/create", ListController.createNewList);
router.get("/read", ListController.readUserList);
router.patch("/rename/:_id", ListController.renameList);

module.exports = router;
