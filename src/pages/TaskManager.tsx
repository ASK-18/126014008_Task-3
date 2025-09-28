import React, { useEffect, useState } from "react";
import { Button, Input, message, Modal } from "antd";
import TaskTable from "../components/TaskTable";
import TaskForm from "../components/TaskForm";
import { Task } from "../types/task";
import {
  getTasks,
  createOrUpdateTask,
  deleteTask,
  findTasksByName,
  runTaskExecution,
} from "../api/taskApi";

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const loadTasks = async (query: string = "") => {
  try {
    const data = query ? await findTasksByName(query) : await getTasks();
    setTasks(data);
  } catch (err) {
    message.error("Tasks not found");
    setTasks([]);
  }
};

useEffect(() => {
  const delayDebounceFn = setTimeout(() => {
    loadTasks(search); // call API with current search value
  }, 300); // 300ms delay to avoid too many calls

  return () => clearTimeout(delayDebounceFn); // cleanup previous timeout
}, [search]); // runs whenever `search` changes

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    message.success("Task deleted");
    loadTasks();
  };

  const handleRun = async (id: string) => {
  try {
    const updatedTask = await runTaskExecution(id);

    setTasks(prevTasks =>
      prevTasks.map(t => (t.id === id ? updatedTask : t))
    );

    message.success(`Output: ${updatedTask.taskExecutions.slice(-1)[0].output}`);
  } catch (err) {
    message.error("Task execution failed");
  }
};

  const handleCreate = async (task: Task) => {
    await createOrUpdateTask(task);
    message.success("Task saved");
    setIsModalVisible(false);
    loadTasks();
  };
  
  return (
    <div style={{ padding: 20 }}>
      <h1>Tasko</h1>
      
 <div style={{ display: "flex", alignItems: "center", marginBottom: 20, gap: 10 }}>
  <Input.Search
    placeholder="Search tasks by name"
    allowClear
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{ flex: 1}} // makes input take remaining width
  />
  <Button type="primary" onClick={() => setIsModalVisible(true)}>
    Add Task
  </Button>
</div>

      <TaskTable tasks={tasks} onDelete={handleDelete} onRun={handleRun} />
      <Modal
        title="Create Task"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <TaskForm onSubmit={handleCreate} />
      </Modal>
    </div>
  );
};

export default TaskManager;
