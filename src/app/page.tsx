"use client";
import Header from "@/app/component/header";
import KanbanBoard from "./component/board";
import { useState } from "react";
import AddTaskModal from "./component/AddTaskModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <main className="flex flex-col justify-between">
      <Header onAddTask={() => setIsModalOpen(true)} />
      <KanbanBoard />
      <AddTaskModal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen} />
    </main>
  );
}
