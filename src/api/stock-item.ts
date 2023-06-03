import { AxiosPromise } from "axios";
import api from ".";
import { StockItem } from "../types/stock";

export async function getStockItemById(
  stockItemId: number
): AxiosPromise<StockItem> {
  return api.get(`stock/${stockItemId}`);
}

export async function createStockItem(
  body: Record<string, any>
): AxiosPromise<StockItem> {
  return api.post("stock", body);
}

export async function updateStockItem(
  stockItemId: number,
  body: Record<string, any>
): AxiosPromise<StockItem> {
  return api.put(`stock/${stockItemId}`, body);
}

export async function deleteStockItem(
  stockItemId: number
): AxiosPromise<StockItem> {
  return api.delete(`stock/${stockItemId}`);
}
