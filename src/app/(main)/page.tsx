"use client";

import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useTaskMutation } from "@/features/todoList/mutations";
import { useTasksList } from "@/features/todoList/queries";
import { Task } from "@/features/todoList/types";
import { Row } from "@/features/todoList/components/check-list";

export default function ItemListPage() {
  const [text, setText] = useState("");
  const { data, isLoading } = useTasksList();
  const { newItem, isNewPending } = useTaskMutation();

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
        <Button type="button" onClick={handleAdd} disabled={isNewPending}>
          추가하기
        </Button>
      </header>

      <main className="flex flex-col gap-12 xl:flex-row xl:gap-6 w-full">
        <Row items={todoItems} isPending={isLoading} />
        <Row items={doneItems} isPending={isLoading} isDone />
      </main>
    </div>
  );
}
