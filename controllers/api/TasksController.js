const mongoose = require('mongoose');
const moment = require('moment');
const Task = require('../../models/Task');
var tasksController = {};

tasksController.index = function(req, res) {
  const { title, date, status } = req.query;
  let query = {};
  if (date) {
    query.createdAt = {
      $gte: moment(date, "YYYY-MM-DD").toDate(),
      $lt: moment(date, "YYYY-MM-DD").endOf('day').toDate()
    } 
  }
  if (title) {
    query.title = new RegExp(title, 'i');
  }
  if (status) {
    query.status = status;
  }
  Task.find(query)
  .sort({'createdAt': 'descending'})
  .then(tasks => {
    res.status(200).json({ tasks });
  })
  .catch(e => res.status(500).json({'error': e.message}));
};

tasksController.create = function(req, res) {
  const userTask = req.body;
  new Task(userTask).save((err, task) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({ success: true, task });
  });
};

tasksController.show = function(req, res) {
  const _id = req.params.id;
  Task.findById(_id)
  .then(task => {
    if (task) {
      res.status(200).json({ task });
    } else {
      res.status(404).json({ message: 'Task not found'})
    }
  })
  .catch(e => res.status(500).json({'error': e.message}));
};

tasksController.update = function(req, res) {
  const _id = req.params.id;
  const updateObj = req.body;
  Task.findByIdAndUpdate(_id, updateObj, {new: true})
  .then(task => {
    if (task) {
      res.status(200).json({ task });
    } else {
      res.status(404).json({ message: 'Task not found'})
    }
  })
  .catch(e => res.status(500).json({'error': e.message}));
};

tasksController.delete = function(req, res) {
  const _id = req.params.id;
  Task.findByIdAndRemove(_id)
  .then(task => {
    if (task) {
      res.status(202).json({ task });
    } else {
      res.status(404).json({ message: 'Task not found'})
    }
  })
  .catch(e => res.status(500).json({'error': e.message}));
};

module.exports = tasksController;