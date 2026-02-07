"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createItem, deleteItem, updateItem, uploadImage } from "./apis";
import { UpdateItemPayload } from "./types";
import { queryKeys } from "./queryKeys";
import { errorToast, toastMessage } from "@/libs/toast-message";

export const useTaskMutation = () => {
  const queryClient = useQueryClient();
  const taskKey = (id: number) => queryKeys.TodoList.detail(id);
  const listKey = queryKeys.TodoList.list;

  const { mutate: deleteTask, isPending: isDeletePending } = useMutation({
    mutationFn: (itemId: number) => deleteItem(itemId),
    onSuccess: (_data, itemId) => {
      toastMessage({ message: "삭제 되었습니다." });

      queryClient.removeQueries({ queryKey: taskKey(itemId) });
      queryClient.invalidateQueries({
        queryKey: listKey,
        refetchType: "active",
      });
    },
    onError: () => errorToast("삭제 실패하였습니다. 다시 시도해주세요."),
  });

  const { mutate: newItem, isPending: isNewPending } = useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      toastMessage({ message: "추가 되었습니다." });

      queryClient.invalidateQueries({
        queryKey: listKey,
        refetchType: "active",
      });
    },
    onError: () => errorToast("등록 실패하였습니다. 다시 시도해주세요."),
  });

  const { mutate: editItem, isPending: isEditPending } = useMutation({
    mutationFn: (payload: UpdateItemPayload) => updateItem(payload),
    onSuccess: (_data, payload) => {
      toastMessage({ message: "수정 되었습니다." });

      queryClient.invalidateQueries({
        queryKey: taskKey(payload.id),
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: listKey,
        refetchType: "active",
      });
    },
    onError: () => errorToast("수정 실패하였습니다. 다시 시도해주세요."),
  });

  const { mutateAsync: editImage, isPending: isEditImagePending } = useMutation<
    string,
    Error,
    File
  >({
    mutationFn: async (file: File) => {
      const url = await uploadImage(file);
      return url;
    },
    onError: () => errorToast("이미지 업로드 실패하였습니다. 다시 시도해주세요."),
  });

  return {
    deleteTask,
    isDeletePending,
    newItem,
    isNewPending,
    editItem,
    isEditPending,
    editImage,
    isEditImagePending,
  };
};
