"use client";

import Badge from "@/components/Badge";
import { RowProps } from "../../types";
import { useTaskMutation } from "../../mutations";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/cn";
import Chip from "@/components/Chip";

type TodoAndDoneRowProps = RowProps & {
  isPending: boolean;
  isDone?: boolean;
};

export const Row = ({ items, isPending, isDone }: TodoAndDoneRowProps) => {
  const router = useRouter();

  const { editItem, isEditPending } = useTaskMutation();

  const handleSubmit = (id: number) => {
    editItem({ id, isCompleted: !isDone });
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {isDone ? <Badge colors="green">DONE</Badge> : <Badge>TO DO</Badge>}

      {isPending ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((task) => (
            <div
              key={task.id}
              className={cn(
                "flex items-center gap-4 h-12.5 rounded-[1.688rem] border-2 border-slate-900 px-3",
                isDone && "bg-violet-100 line-through",
              )}
            >
              <Chip
                type="button"
                disabled={isEditPending}
                onClick={() => handleSubmit(task.id)}
                aria-label={isDone ? "완료로 이동" : "미완료로 이동"}
                isDone={isDone}
                className="cursor-pointer"
              />
              <span
                className="flex items-center w-full h-full cursor-pointer"
                onClick={() => router.push(`/items/${task.id}`)}
              >
                {task.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
