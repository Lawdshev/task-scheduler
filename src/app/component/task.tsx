"use client";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

export interface ITask {
  id: number;
  type: string;
  title: string;
  description: string;
  executionTime: string;
  moveIn: number;
  isRecurring: boolean;
  recurringFrequency: {
    value: string;
    unit: string;
  };
  maxRecurrences: number;
  recurrenceCount: number;
}

interface TaskProps extends ITask {
  onDelete: (id: number) => void;
}

const Task = ({
  id,
  type,
  title,
  description,
  executionTime,
  isRecurring,
  maxRecurrences,
  recurrenceCount,
  onDelete,
}: TaskProps) => {
  const [countdown, setCountdown] = useState(10);
  const [isInProgress, setIsInProgress] = useState(type === "inprogress");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isInProgress) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev > 1) return prev - 1;
          clearInterval(timer);
          setIsInProgress(false);
          return 0;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isInProgress]);

  const getColor = () => {
    switch (type) {
      case "backlog":
        return "bg-gray-300";
      case "inprogress":
        return "bg-yellow-300";
      case "completed":
        return "bg-green-300";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="flex p-4 border rounded-lg mb-4 shadow-lg relative">
      <div className={`${getColor()} w-2 mr-4`} />
      <div className="flex-grow">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-700 mb-4">{description}</p>
        {!isInProgress ? (
          <p className="text-gray-500">Execution Time: {executionTime}</p>
        ) : (
          <div className="flex items-center">
            <div className="w-1 bg-blue-500 h-10 mr-2 animate-spin" />
            <p className="text-gray-500">Time Left: {countdown}s</p>
          </div>
        )}
        {isRecurring && recurrenceCount < maxRecurrences && (
          <p className="text-blue-500">
            Recurring Task (Remaining: {maxRecurrences - recurrenceCount})
          </p>
        )}
      </div>
      <button
        onClick={() => onDelete(id)}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default Task;
