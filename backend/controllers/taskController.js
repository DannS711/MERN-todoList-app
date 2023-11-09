const List = require("../models/list");
const Task = require("../models/task");

class TaskController {
  static async getTaskByListId(req, res, next) {
    const { _id } = req.params;

    try {
      const getListById = await List.findById(_id);

      if (!getListById) {
        throw { name: "ListNotFound" };
      }

      const getTasks = await Task.find({ ListId: _id });

      if (!getTasks || getTasks.length === 0) {
        throw { name: "TaskNotFound" };
      }

      res.status(200).json({
        data: getTasks,
      });
    } catch (error) {
      next(error);
    }
  }

  static async createTask(req, res, next) {
    const { _id } = req.params;
    const { task } = req.body;

    try {
      const list = await List.findById(_id);

      if (!list) {
        throw { name: "ListNotFound" };
      }

      const createdTask = new Task({ task, ListId: _id });
      await createdTask.save();

      res.status(201).json({
        createdTask,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TaskController;
