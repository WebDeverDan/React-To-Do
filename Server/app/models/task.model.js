module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
      text: {
        type: Sequelize.STRING
      },
      day: {
        type: Sequelize.STRING
      },
      reminder: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Task;
  };