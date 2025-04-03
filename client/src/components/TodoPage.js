import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const TodoPage = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setTitle] = useState("");
  const [date, setDate] = useState("");

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

  // Add a new task
  const addTask = async () => {
    try {
      let day = new Date(date).toLocaleDateString("en-US");
      console.log(date);
      const newTask = { text, day };

      const response = await axios.post("http://localhost:8080/api/tasks", newTask);
      setTasks([...tasks, response.data]);
      setTitle("");
      setDate("");
    } catch (error) {
      console.log("Error adding task:", error);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  // Load tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="todo-app">
      <h3>Todos at a Glance</h3>
      <div className="form">
        <label>
          Task Name:
          <input type="text" placeholder="Type the task..." value={text} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Due date:
          <input style={{ fontSize: "18px" }} type="date" placeholder="add a date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <br />
        <div className="button-box">
          <button style={{ backgroundColor: "green" }} onClick={addTask}>
            Add Task
          </button>
        </div>
      </div>
      <div className="tasks-sum">
      {tasks.length === 1 ? (
          <p>There is {tasks.length} unfinished task. So Close!</p>
        ) : tasks.length > 1? (
        <p>There are {tasks.length} unfinished tasks. Get Going!</p>
        ): <p></p>}
      </div>
      <div className="task-list">
        {tasks.length === 0 ? (
          <p>No tasks yet.</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="task-item">
              <p className="task-content">{task.text}</p>
              <p className="task-content">Due: {task.day}</p>
              <button onClick={() => deleteTask(task.id)}>
                <FontAwesomeIcon icon={faTrashCan} style={{ color: "#ffffff" }} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoPage;
