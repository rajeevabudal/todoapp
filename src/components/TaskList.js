import React from "react";
import { Table, Button, Tag, Select, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import "./task.css"


const TaskList = ({ tasks, onUpdateStatus, onDeleteTask }) => {
  const navigate = useNavigate();
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (status) => (
        <Tag
          color={
            status === "To Do"
              ? "blue"
              : status === "In Progress"
              ? "orange"
              : "green"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (task) => (
        <div style={{ display: "flex", gap: "8px", paddingTop: "8px" }}>
          <Button onClick={() => onUpdateStatus(task._id, "In Progress")}>
            Start
          </Button>
          <Button onClick={() => onUpdateStatus(task._id, "Done")}>
            Complete
          </Button>
          <Button onClick={() => onDeleteTask(task._id)}>Delete</Button>
        </div>
      ),
    },
  ];

  const dataSource = tasks.map((task) => ({
    key: task._id,
    title: <strong>{task.title}</strong>,
    description: <p>{task.description}</p>,
    status: task.status,
    actions: task, // pass the whole task object to the render function
  }));

  const onCreateTask = ()=>{
    navigate("/create")
  }
  return (
    <div>
      <Row>
      <Col span={12}></Col>
        <Col span={12}>
          <Button
            type="primary"
            onClick={onCreateTask}
            className="createTask"
          >
            Create Task
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table columns={columns} dataSource={dataSource} />
        </Col>
      </Row>
    </div>
  );
};

export default TaskList;
