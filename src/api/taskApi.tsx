import axios from "axios";
import { Task, TaskExecution } from "../types/task";
import { API_URL } from "../config";   // ✅ central place for backend URL

export const getTasks = async (): Promise<Task[]> => {
  const res = await axios.get(`${API_URL}/tasks`);
  return res.data;
};

// ... other APIs remain the same


export const getTaskById = async (id: string): Promise<Task> => {
  const res = await axios.get(`${API_URL}/tasks?id=${id}`);
  return res.data;
};

export const createOrUpdateTask = async (task: Task) => {
  const res = await axios.put(`${API_URL}/tasks`, task);
  return res.data;
};

export const deleteTask = async (id: string) => {
  const res = await axios.delete(`${API_URL}/tasks/${id}`); // path param
  return res.data;
};


export const findTasksByName = async (name: string): Promise<Task[]> => {
  const res = await axios.get(`${API_URL}/tasks/search?name=${name}`);
  return res.data;
};
// After


export const runTaskExecution = async (taskId: string): Promise<Task> => {
  const res = await axios.put(`${API_URL}/tasks/${taskId}/execute`);
  return res.data; // backend returns updated Task
};
