import axios from "axios";
import { UpdateItemPayload } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID;

const api = axios.create({
  baseURL: `${BASE_URL}/${TENANT_ID}`,
  headers: {
    "Content-Type": "application/json",
  },
});

const throwApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    throw error.response?.data ?? error;
  }
  throw error;
};

// 항목 등록
export const createItem = async (name: string) => {
  try {
    const { data } = await api.post("/items", { name });
    return data;
  } catch (error) {
    throwApiError(error);
  }
};

// 항목 목록 조회 // ! 추후 pageSize 최대 값 확인 필요
export const listItems = async (page = 1, pageSize = 100) => {
  try {
    const { data } = await api.get("/items", {
      params: { page, pageSize },
    });
    return data;
  } catch (error) {
    throwApiError(error);
  }
};

// 항목 상세 조회
export const getItem = async (itemId: number) => {
  try {
    const { data } = await api.get(`/items/${itemId}`);
    return data;
  } catch (error) {
    throwApiError(error);
  }
};

// 항목 수정
export const updateItem = async (payload: UpdateItemPayload) => {
  try {
    const { id, ...body } = payload;
    const { data } = await api.patch(`/items/${id}`, body);
    return data;
  } catch (error) {
    throwApiError(error);
  }
};

// 항목 삭제
export const deleteItem = async (itemId: number) => {
  try {
    const { data } = await api.delete(`/items/${itemId}`);
    return data;
  } catch (error) {
    throwApiError(error);
  }
};

// 이미지 업로드
export const uploadImage = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const { data } = await axios.post(`${BASE_URL}/${TENANT_ID}/images/upload`, formData);
    const url = data?.url;
    if (!url) throw new Error("Upload response missing url");

    return url;
  } catch (error) {
    throwApiError(error);
    throw error;
  }
};
