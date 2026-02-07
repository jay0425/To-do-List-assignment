"use client";

import Badge from "@/components/Badge";
import { RowProps } from "../../types";
import { useTaskMutation } from "../../mutations";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import { CheckIcon } from "public/icons";
import { cn } from "@/utils/cn";

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
              {isDone ? (
                <button
                  type="button"
                  disabled={isEditPending}
                  onClick={() => handleSubmit(task.id)}
                  className="flex justify-center items-center w-8 h-8 bg-violet-600 rounded-full cursor-pointer disabled:opacity-60"
                  aria-label="미완료로 이동"
                >
                  <CheckIcon className="w-4 h-4 text-white" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isEditPending}
                  onClick={() => handleSubmit(task.id)}
                  className="w-8 h-8 border-2 border-slate-900 bg-yellow-50 rounded-full cursor-pointer disabled:opacity-60"
                  aria-label={isDone ? "완료로 이동" : "미완료로 이동"}
                />
              )}
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
