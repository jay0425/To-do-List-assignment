"use client";

import Badge from "@/components/Badge";
import { CheckIcon } from "public/icons";
import { RowProps } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateItem } from "@/features/todoList/apis";

export const DoneRow = ({ items }: RowProps) => {
  const queryClient = useQueryClient();

  const { mutate: uncompleteItem, isPending } = useMutation({
    mutationFn: (id: number) => updateItem({ id, isCompleted: false }),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return (
    <div className="flex flex-col gap-4 w-full">
      <Badge colors="green">DONE</Badge>

      <div className="flex flex-col gap-3">
        {items.map((task) => (
          <span
            key={task.id}
            className="flex items-center gap-4 h-12.5 rounded-[1.688rem] border-2 border-slate-900 px-3 line-through bg-violet-100"
          >
            <button
              type="button"
              disabled={isPending}
              onClick={() => uncompleteItem(task.id)}
              className="flex justify-center items-center w-8 h-8 bg-violet-600 rounded-full cursor-pointer disabled:opacity-60"
              aria-label="미완료로 이동"
            >
              <CheckIcon className="w-4 h-4 text-white" />
            </button>

            {task.name}
          </span>
        ))}
      </div>
    </div>
  );
};
