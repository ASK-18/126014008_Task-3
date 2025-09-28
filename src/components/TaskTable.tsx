import React from "react";
import { Table, Button } from "antd";
import { Task } from "../types/task";

interface TaskTableProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onRun: (id: string) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onDelete, onRun }) => {
  return (
   <Table dataSource={tasks} rowKey="id">
  <Table.Column title="ID" dataIndex="id" key="id" />
  <Table.Column title="Name" dataIndex="name" key="name" />
  <Table.Column title="Owner" dataIndex="owner" key="owner" />
  <Table.Column title="Command" dataIndex="command" key="command" />
  <Table.Column
    title="Latest Output"
    key="latestOutput"
    render={(_, record) => {
      const executions = record.taskExecutions;
      return executions.length > 0
        ? executions[executions.length - 1].output
        : "-";
    }}
  />
  <Table.Column
    title="Actions"
    key="actions"
    render={(_, record) => (
      <>
        <Button type="primary" onClick={() => onRun(record.id)} style={{ marginRight: 8 }}>
          Run
        </Button>
        <Button danger onClick={() => onDelete(record.id)}>
          Delete
        </Button>
      </>
    )}
  />
</Table>

  );
};

export default TaskTable;
