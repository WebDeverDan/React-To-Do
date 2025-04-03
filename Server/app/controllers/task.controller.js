const db = require("../models");
const Tasks = db.tasks;
const Op = db.Sequelize.Op;

// Create and Save a new Task
exports.create = (req, res) => {
    // Validate request
    if (!req.body.text) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Task
    const task = {
      text: req.body.text,
      day: req.body.day,
      reminder: req.body.reminder,
      createdAt: "2017-06-15T00:00:00.000Z",
      updatedAt: "2017-06-15T00:00:00.000Z"
    };
  
    // Save Task in the database
    Tasks.create(task)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the task."
        });
      });
  };
  
  // Retrieve all Tasks from the database.
  exports.findAll = (req, res) => {
    console.log("App has requested data...")
    const text = req.query.text;
    var condition = text ? { text: { [Op.like]: `%${text}%` } } : null;
    console.log("Trying to findAll")
    console.log(Tasks)
    Tasks.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tasks."
        });
      });
  };
  
  // Find a single Task with an id
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Tasks.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Task with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Task with id=" + id
        });
      });
  };
  
  // Update a Task by the id in the request
  exports.update = (req, res) => {
    const id = req.params.id;
    Tasks.update(req.body, {
      where: { id: id }
    })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Task with id=" + id
        });
      });
  };
  
  // Delete a Task with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Tasks.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Task was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Task with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
  };
  
  // // Delete all Tasks from the database.
  // exports.deleteAll = (req, res) => {
  //   Tasks.destroy({
  //     where: {},
  //     truncate: false
  //   })
  //     .then(nums => {
  //       res.send({ message: `${nums} Tasks were deleted successfully!` });
  //     })
  //     .catch(err => {
  //       res.status(500).send({
  //         message:
  //           err.message || "Some error occurred while removing all tasks."
  //       });
  //     });
  // };
  
 