"use client";

import { useEffect, useState } from "react";

import { cn } from "@/utils/cn";
import { DetailRowProps } from "../../types";
import Chip from "@/components/Chip";
import { useTaskMutation } from "../../mutations";

export const DetailRow = (props: DetailRowProps) => {
  const isDone = props.isDone;

  const [name, setName] = useState(props.name);

  useEffect(() => {
    setName(props.name);
  }, [props.name]);

  const { editItem, isEditPending } = useTaskMutation();
  const handleSubmit = (id: number) => {
    editItem({ id, isCompleted: !isDone });
  };

  return (
    <div
      className={cn(
        "h-16 flex justify-center items-center gap-4",
        "border-2 border-slate-900 rounded-3xl",
        isDone ? "bg-violet-200" : "bg-white",
      )}
    >
      <Chip
        type="button"
        disabled={isEditPending}
        onClick={() => handleSubmit(props.id)}
        aria-label={isDone ? "완료로 이동" : "미완료로 이동"}
        isDone={isDone}
        className="cursor-pointer"
      />
      <input
        value={name}
        onChange={(e) => {
          const next = e.target.value;
          setName(next);
          props.onNameChange?.(next);
        }}
        className={cn(
          "truncate outline-0",
          "font-bold text-xl leading-none",
          "underline decoration-solid underline-offset-1",
        )}
      />
    </div>
  );
};
