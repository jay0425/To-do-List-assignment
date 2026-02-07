export const queryKeys = {
  TodoList: {
    detail: (id?: number) => ["to-do-list", "detail", id] as const,
    list: ["to-do-list", "list"] as const,
  },
};
