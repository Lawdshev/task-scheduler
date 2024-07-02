"use client";
import { useTasks } from "@/hooks/useTasks";
import React, { useState } from "react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTaskModal = ({ isOpen, onClose }: IProps) => {
  const { addTask, taskNumber } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("10:00");
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState({
    unit: "hours",
    value: "1",
  });
  const [maxRecurrences, setMaxRecurrences] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // convert time to seconds
    const seconds =
      parseInt(time.split(":")[0]) * 3600 + parseInt(time.split(":")[1]) * 60;

    addTask({
      id: taskNumber + 1,
      title,
      description,
      executionTime: time,
      type: "backlog",
      moveIn: seconds - 10,
      isRecurring,
      recurringFrequency,
      maxRecurrences,
      recurrenceCount: 0, // Initial recurrence count
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4 text-black">Schedule Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              className="w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              className="w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Execution Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Is Recurring</label>
            <input
              type="checkbox"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
            />
          </div>
          {isRecurring && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Recurring Frequency
                </label>
                <select
                  value={recurringFrequency.unit}
                  onChange={(e) =>
                    setRecurringFrequency({
                      ...recurringFrequency,
                      unit: e.target.value,
                    })
                  }
                  className="w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option value="hours">Hours</option>
                  <option value="minutes">Minutes</option>
                  <option value="seconds">Seconds</option>
                </select>
                <input
                  type="number"
                  value={recurringFrequency.value}
                  onChange={(e) =>
                    setRecurringFrequency({
                      ...recurringFrequency,
                      value: e.target.value,
                    })
                  }
                  className="w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                  min="1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Max Recurrences
                </label>
                <input
                  type="number"
                  value={maxRecurrences}
                  onChange={(e) => setMaxRecurrences(Number(e.target.value))}
                  className="w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                  min="1"
                />
              </div>
            </>
          )}
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
