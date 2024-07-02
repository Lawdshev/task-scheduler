"use client";
import React from "react";
import Task, { type ITask } from "./task";
import { useTasks } from "@/hooks/useTasks";

const KanbanColumn = ({ title, tasks }: { title: string; tasks: ITask[] }) => {
  const { deleteTask } = useTasks();
  return (
    <div className="w-1/3 p-4 ">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="space-y-4 max-h-[80vh] overflow-y-scroll">
        {tasks.map((task) => (
          <Task
            key={task.id}
            type={task.type}
            title={task.title}
            description={task.description}
            executionTime={task.executionTime}
            id={task.id}
            moveIn={task.moveIn}
            isRecurring={task.isRecurring}
            maxRecurrences={task.maxRecurrences}
            recurrenceCount={task.recurrenceCount}
            recurringFrequency={task.recurringFrequency}
            onDelete={() => deleteTask(task.id)}
          />
        ))}
      </div>
    </div>
  );
};

const KanbanBoard = () => {
  const { Tasks } = useTasks();

  return (
    <div className="flex">
      <KanbanColumn title="Backlog" tasks={Tasks.backlog} />
      <KanbanColumn title="In Progress" tasks={Tasks.inprogress} />
      <KanbanColumn title="Completed" tasks={Tasks.completed} />
    </div>
  );
};

export default KanbanBoard;
