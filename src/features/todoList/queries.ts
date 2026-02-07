import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import { getItem, listItems } from "./apis";

const taskKey = (id: number) => queryKeys.TodoList.detail(id);
const listKey = queryKeys.TodoList.list;

export const useTaskDetail = (itemId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: taskKey(itemId),
    queryFn: () => getItem(itemId),
    enabled: !!itemId,
  });

  return {
    data,
    isLoading,
    error,
  };
};

export const useTasksList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: listKey,
    queryFn: () => listItems(),
  });

  return {
    data,
    isLoading,
    error,
  };
};
