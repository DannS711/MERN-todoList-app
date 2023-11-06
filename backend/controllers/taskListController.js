const List = require("../models/list");

class TaskListController {
  static async createNewList(req, res, next) {
    const { listName } = req.body;
    const { UserId } = req.userData;
  
    try {
      const addList = new List({ listName, UserId });
  
      await addList.save();
      
      res.status(201).json({
        data: addList,
        message: "List has been created!",
      });
    } catch (error) {
      next(error);
    }
  }

  static async readUserList(req, res, next) {
    const { UserId } = req.userData;
    try {
      const lists = await List.find({ UserId });
      if (!lists || lists.length === 0) {
        throw { name: "ListNotFound" };
      } else {
        res.status(200).json({
          data: lists,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async renameList(req, res, next) {
    const { _id } = req.params;
    const { listName } = req.body;

    try {
      const updatedList = await List.findByIdAndUpdate(
        { _id: _id },
        { $set: { listName: listName } },
        { new: true }
      );

      if (!updatedList) throw { name: "ListNotFound" };

      res.status(200).json({
        data: updatedList,
        message: "List has been renamed.",
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteList(req, res, next) {
    const { _id } = req.params;

    try {
      const deletedList = await List.findByIdAndDelete({ _id });

      if (!deletedList) throw { name: "ListNotFound" };

      res.status(200).json({
        message: "List has been deleted.",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TaskListController;
