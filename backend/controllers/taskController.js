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

  static async rewriteTask(req, res, next) {
    const { _id } = req.params;
    const { task } = req.body;
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        { _id: _id },
        { $set: { task } },
        { new: true }
      );

      if (!updatedTask) throw { name: "TaskNotFound" };

      res.status(201).json({
        data: updatedTask,
      });
    } catch (error) {
      next(error);
    }
  }

  static async changeTaskStatus(req, res, next) {
    const { _id } = req.params;
    const { isCompleted } = req.body;
  
    try {
      const changeStatus = await Task.findByIdAndUpdate(
        _id,
        { $set: { isCompleted } },
        { new: true, lean: true }
      );
  
      if (!changeStatus) {
        throw { name: "TaskNotFound" };
      }
  
      res.status(200).json({
        data: changeStatus,
      });
    } catch (error) {
      next(error);
    }
  }
  
}

module.exports = TaskController;
