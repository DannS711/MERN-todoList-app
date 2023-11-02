const express = require("express");
const ListController = require("../controllers/listController");
const router = express.Router();

router.post("/create", ListController.createNewList);
router.get("/read", ListController.readUserList);

module.exports = router;
