export type Item = {
  id: number;
  tenantId: string;
  name: string;
  memo: string | null;
  imageUrl: string | null;
  isCompleted: boolean;
};

export type ListItemsResponse = {
  items: Item[];
  total?: number;
};

export type UpdateItemPayload = { id: Item["id"] } & {
  name?: string;
  memo?: string | null;
  imageUrl?: string | null;
  isCompleted?: boolean;
};

export type Task = Pick<Item, "id" | "name" | "isCompleted">;

export interface RowProps {
  items: Task[];
}
