import moment from 'moment';
import axios from '../utils/axios';

const processTask = (task: any) => {
  const isTaskDue = new Date(task.due_date) < new Date();
  task.isDue = isTaskDue;

  if (task.sub_task && task.sub_task.length > 0) {
    let progress = 0;

    task.sub_task.forEach((subTask: any) => {
      const isSubTaskDue = new Date(subTask.due_date) < new Date();
      subTask.isDue = isSubTaskDue;

      if (subTask.status === 'done') {
        progress += 1;
      }
    });

    task.progress = task.sub_task.length > 0 ? progress / task.sub_task.length : 0;
  } else {
    task.sub_task = [];
    task.progress = 0;
  }

  return task;
};

export const getTaskList = async ({ limit = 5, page = 1, search = '', status = '' }) => {
  try {
    let url = `/restricted/task?page=${page}&limit=${limit}`;
    if (search) {
      url += `&search=${search}`;
    }
    if (status) {
      url += `&status=${status}`;
    }
    const response = await axios.get(url);
    if (response.data?.data?.records.length > 0) {
      response.data.data.records = response.data.data.records.map(processTask);
      return response.data;
    }
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateTask = async (isSubTask: boolean, data: any) => {
  try {
    let url = `/restricted/task/${data.id}`;
    if (isSubTask) {
      url = `/restricted/subtask/${data.id}`;
    }
    console.log(data);
    if (data.due_date.includes('GMT')) {
      data.due_date = moment(data.due_date).format('YYYY-MM-DD').toString();
    } else {
      data.due_date = data.due_date.split('T')[0];
    }
    console.log(data);
    const payload = {
      ...data,
      due_date: `${data.due_date}T23:59:59.000Z`,
    };
    const response = await axios.put(url, payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const createTask = async (isSubTask: boolean, data: any) => {
  try {
    let url = `/restricted/task`;
    if (isSubTask) {
      url = `/restricted/subtask`;
    }
    const stringDate = moment(data.due_date).format('YYYY-MM-DD').toString();
    const payload = {
      ...data,
      due_date: `${stringDate}T23:59:59.000Z`,
    };
    const response = await axios.post(url, payload);
    return response.data;
    // return true;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteTask = async (id: number, isSubTask: boolean) => {
  try {
    let url = `/restricted/task/${id}`;
    if (isSubTask) {
      url = `/restricted/subtask/${id}`;
    }
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
