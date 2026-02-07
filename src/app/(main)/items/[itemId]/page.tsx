"use client";

import Button from "@/components/Button";
import FileUpload from "@/components/FileUpload";
import Spinner from "@/components/Spinner";
import Textarea from "@/components/Textarea";
import { DetailRow } from "@/features/todoList/components/check-list-detail";
import { useTaskDetail } from "@/features/todoList/queries";
import { cn } from "@/utils/cn";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ItemDetailPage() {
  const { itemId } = useParams<{ itemId: string }>();
  const id = Number(itemId);
  const { data: initialData, isLoading } = useTaskDetail(id);
  const isDone = initialData?.isCompleted;

  const [name, setName] = useState("");

  useEffect(() => {
    if (initialData?.name !== undefined) {
      setName(initialData.name);
    }
  }, [initialData?.name]);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="w-full min-h-screen flex flex-col gap-4.25 sm:gap-6">
      <DetailRow name={name} isDone={isDone} onNameChange={setName} />
      <main className={cn("flex flex-col gap-3.75 sm:gap-6 xl:flex-row")}>
        <FileUpload />
        <Textarea />
      </main>
      <footer className="flex w-full justify-end gap-1.75 md:gap-2 xl:gap-4">
        <Button iconType="check" colors={isDone ? "lime" : "primary"}>
          수정완료
        </Button>
        <Button iconType="delete" colors="rose">
          삭제하기
        </Button>
      </footer>
    </div>
  );
}
