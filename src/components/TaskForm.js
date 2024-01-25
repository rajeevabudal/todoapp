import React, { useState } from "react";
import { Input, Select, Button } from "antd";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;
const { Option } = Select;

const TaskForm = ({ onTaskAdded }) => {
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "To Do",
  });

  const handleInputChange = (key, value) => {
    setTask({ ...task, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/tasks", task);
      onTaskAdded(response.data);
      setTask({ title: "", description: "", status: "To Do" });
    } catch (error) {
      console.error("Error creating task:", error.message);
    }
  };

  const handleListsButtonClick = () => {
    navigate("/tasks")
  };

  return (
    <>
      <div style={{ marginBottom: "8px", padding: "16px" }}>
        <Button type="primary" onClick={handleListsButtonClick}>
          Lists
        </Button>
      </div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          padding: "16px",
        }}
      >
        {/* Left column with input and textarea */}
        <div>
          <Input
            type="text"
            name="title"
            value={task.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="Title"
            required
          />
          <TextArea
            name="description"
            value={task.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Description"
            style={{ marginTop: "16px" }}
          />
        </div>

        {/* Right column with select, button, and lists button */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Select
            value={task.status}
            style={{ marginBottom: "8px", width: "120px" }}
            onChange={(value) => handleInputChange("status", value)}
          >
            <Option value="To Do">To Do</Option>
            <Option value="In Progress">In Progress</Option>
            <Option value="Done">Done</Option>
          </Select>

          <Button type="primary" htmlType="submit">
            Add Task
          </Button>
        </div>
      </form>
    </>
  );
};

export default TaskForm;
