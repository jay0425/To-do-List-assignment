"use client";

import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { DoneRow } from "@/features/todoList/components/check-list/doneRow";
import { TodoRow } from "@/features/todoList/components/check-list/todoRow";
import { useTaskMutation } from "@/features/todoList/mutations";
import { useTasksList } from "@/features/todoList/queries";
import { Task } from "@/features/todoList/types";

export default function ItemListPage() {
  const [text, setText] = useState("");
  const { data } = useTasksList();
  const { newItem } = useTaskMutation();

  const tasks = (data ?? []) as Task[];

  const todoItems = tasks.filter((t) => !t.isCompleted);
  const doneItems = tasks.filter((t) => t.isCompleted);

  const handleAdd = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    newItem(trimmed);
    setText("");
  };

  return (
    <div className="min-h-screen w-full">
      <header className="w-full flex gap-4 mb-10 sm:mb-6">
        <Input
          value={text}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") handleAdd();
          }}
        />
        <Button type="button" onClick={handleAdd}>
          추가하기
        </Button>
      </header>

      <main className="flex flex-col gap-12 xl:flex-row xl:gap-6 w-full">
        <TodoRow items={todoItems} />
        <DoneRow items={doneItems} />
      </main>
    </div>
  );
}
