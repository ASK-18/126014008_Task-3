import React from "react";
import { Form, Input, Button } from "antd";
import { Task } from "../types/task";

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  initialValues?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialValues }) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onSubmit}
    >
      <Form.Item name="id" label="ID" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="owner" label="Owner" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="command" label="Command" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save Task
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
