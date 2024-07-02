"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import type { ITask } from "@/app/component/task";

interface TasksContextType {
  tasks: ITask[];
  addTask: (task: ITask) => void;
  updateTask: (task: ITask) => void;
  deleteTask: (id: number) => void;
  taskNumber: number;
  Tasks: {
    backlog: ITask[];
    inprogress: ITask[];
    completed: ITask[];
  };
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const Tasks = useMemo(() => {
    return {
      backlog: tasks.filter((task) => task.type === "backlog"),
      inprogress: tasks.filter((task) => task.type === "inprogress"),
      completed: tasks.filter((task) => task.type === "completed"),
    };
  }, [tasks]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      setTasks([]);
    }
  }, []);

  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = getTimeOfDayInSeconds();
      const updatedTasks = tasks.map((task) => {
        const timeToSec =
          Number(task.executionTime.split(":")[0]) * 3600 +
          Number(task.executionTime.split(":")[1]) * 60;
        if (task.type === "backlog" && now >= task.moveIn) {
          return { ...task, type: "inprogress" };
        } else if (task.type === "inprogress" && now >= timeToSec) {
          if (task.isRecurring && task.recurrenceCount < task.maxRecurrences) {
            const newExecTimeSec = getNewExecutionTime(
              task.recurringFrequency.unit,
              task.recurringFrequency.value,
              timeToSec
            );
            const newExecTime = formatSecondsToTime(newExecTimeSec);
            return {
              ...task,
              type: "backlog",
              moveIn: newExecTimeSec - 10,
              executionTime: newExecTime,
              recurrenceCount: task.recurrenceCount + 1,
            };
          }
          return { ...task, type: "completed" };
        }
        return task;
      });
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }, 1000);

    return () => clearInterval(interval);
  }, [tasks]);

  const addTask = (task: ITask) => {
    const exist = tasks.find((t) => t.title.toLowerCase() === task.title.toLowerCase());
    if (exist) return;
    const updatedTasks = [task, ...tasks];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const updateTask = (task: ITask) => {
    const updatedTasks = tasks.map((t) => (t.id === task.id ? task : t));
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        taskNumber: tasks.length,
        Tasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};

const getTimeOfDayInSeconds = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  return hours * 3600 + minutes * 60 + seconds;
};

const getNewExecutionTime = (
  unit: string,
  value: string,
  executionTime: number
) => {
  const multiplyValue = unit === "hours" ? 3600 : unit === "minutes" ? 60 : 1;
  const valueToSec = Number(value) * multiplyValue;
  return executionTime + valueToSec;
};

const formatSecondsToTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  return `${hours}:${minutes}`;
};