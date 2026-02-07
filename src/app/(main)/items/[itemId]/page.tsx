"use client";

import Button from "@/components/Button";
import FileUpload from "@/components/FileUpload";
import Spinner from "@/components/Spinner";
import Textarea from "@/components/Textarea";
import { DetailRow } from "@/features/todoList/components/check-list-detail";
import { useTaskDetail } from "@/features/todoList/queries";
import { cn } from "@/utils/cn";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTaskMutation } from "@/features/todoList/mutations";

export default function ItemDetailPage() {
  const router = useRouter();
  const { itemId } = useParams<{ itemId: string }>();
  const id = Number(itemId);

  const { data: initialData, isLoading } = useTaskDetail(id);
  const isDone = initialData?.isCompleted;

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [memo, setMemo] = useState<string>("");

  useEffect(() => {
    if (initialData?.name !== undefined) setName(initialData.name);

    if (initialData?.imageUrl !== undefined && initialData.imageUrl !== null) {
      setImageUrl(initialData.imageUrl);
    } else if (initialData?.imageUrl === null) {
      setImageUrl("");
    }

    if (initialData?.memo !== undefined) setMemo(initialData.memo ?? "");
  }, [initialData?.name, initialData?.imageUrl, initialData?.memo]);

  const { editItem, isEditPending, deleteTask, isDeletePending, editImage, isEditImagePending } =
    useTaskMutation();

  const handleEditSubmit = () => {
    editItem(
      {
        id,
        name,
        imageUrl,
        memo,
      },
      {
        onSuccess: () => {
          router.push("/");
        },
      },
    );
  };

  const handleDelete = () => {
    deleteTask(id, {
      onSuccess: () => {
        router.push("/");
      },
    });
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="w-full min-h-screen flex flex-col gap-4.25 sm:gap-6">
      <DetailRow id={id} name={name} isDone={isDone} onNameChange={setName} />
      <main className={cn("flex flex-col gap-3.75 sm:gap-6 xl:flex-row")}>
        <FileUpload
          imagePreviewUrl={imageUrl}
          isUploading={isEditImagePending}
          onUpload={async (file) => {
            const url = await editImage(file);
            setImageUrl(url);
            return url;
          }}
        />

        <Textarea value={memo} onChange={setMemo} />
      </main>

      <footer className="flex w-full justify-end gap-1.75 md:gap-2 xl:gap-4">
        <Button
          iconType="check"
          colors={isDone ? "lime" : "primary"}
          onClick={handleEditSubmit}
          disabled={isEditPending || isEditImagePending}
        >
          수정완료
        </Button>
        <Button iconType="delete" colors="rose" onClick={handleDelete} disabled={isDeletePending}>
          삭제하기
        </Button>
      </footer>
    </div>
  );
}
