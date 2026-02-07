"use client";

import Badge from "@/components/Badge";
import { RowProps } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateItem } from "@/features/todoList/apis";

export const TodoRow = ({ items }: RowProps) => {
  const queryClient = useQueryClient();

  const { mutate: completeItem, isPending } = useMutation({
    mutationFn: (id: number) => updateItem({ id, isCompleted: true }),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return (
    <div className="flex flex-col gap-4 w-full">
      <Badge>TO DO</Badge>

      <div className="flex flex-col gap-3">
        {items.map((task) => (
          <span
            key={task.id}
            className="flex items-center gap-4 h-12.5 rounded-[1.688rem] border-2 border-slate-900 px-3"
          >
            <button
              type="button"
              disabled={isPending}
              onClick={() => completeItem(task.id)}
              className="w-8 h-8 border-2 border-slate-900 bg-yellow-50 rounded-full cursor-pointer disabled:opacity-60"
              aria-label="완료로 이동"
            />
            {task.name}
          </span>
        ))}
      </div>
    </div>
  );
};
