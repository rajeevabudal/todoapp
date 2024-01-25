// App.js
import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import { api } from "./services/api";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState("All");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get(`/tasks`);

        if (filteredStatus === "All") {
          setTasks(response.data);
        } else if (filteredStatus === "In Progress") {
          let task = [...response.data];
          let filterTask = task.filter((t) => t.status === "In Progress");
          setTasks(filterTask);
        } else if (filteredStatus === "To Do") {
          let task = [...response.data];
          let filterTask = task.filter((t) => t.status === "To Do");
          setTasks(filterTask);
        } else if (filteredStatus === "Done") {
          let task = [...response.data];
          let filterTask = task.filter((t) => t.status === "Done");
          setTasks(filterTask);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    };

    fetchTasks();
  }, [filteredStatus]);

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      await api.put(`/tasks/${taskId}`, { status: newStatus });
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task status:", error.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    console.log(taskId);
    try {
      await api.delete(`/tasks/${taskId}`);
      const remainingTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(remainingTasks);
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  const handleFilter = (status) => {
    setFilteredStatus(status);
  };

  return (
    <Router>
      <Row>
        <Col span={8}></Col>

        <Col span={8}>
          <h1>Task Management App</h1>
        </Col>
        <Col span={8}></Col>
      </Row>
      <Row>
        <Col span={24}>
          <Routes>
            <Route
              path="/create"
              element={<TaskForm onTaskAdded={handleTaskAdded} />}
            />

            <Route
              path="/tasks"
              exact
              element={
                <>
                  <Row>
                    <Col span={24}>
                      <TaskFilter onFilterChange={handleFilter} />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <TaskList
                        tasks={tasks}
                        onUpdateStatus={handleUpdateStatus}
                        onDeleteTask={handleDeleteTask}
                      />
                    </Col>
                  </Row>
                </>
              }
            />
            <Route path="/" element={<Navigate to="/tasks" />} />
          </Routes>
        </Col>
      </Row>
    </Router>
  );
};

export default App;
