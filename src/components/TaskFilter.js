import React from "react";
import { Select } from "antd";

const { Option } = Select;

const FilterSelect = ({ onFilterChange }) => {
  return (
    <Select
      defaultValue="All"
      style={{
        width: 120,
      }}
      onChange={(value) => onFilterChange(value)}
    >
      <Option value="All">All</Option>
      <Option value="To Do">To Do</Option>
      <Option value="In Progress">In Progress</Option>
      <Option value="Done">Done</Option>
    </Select>
  );
};

export default FilterSelect;
