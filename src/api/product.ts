import { AxiosPromise } from 'axios';
import api from '.';
import { Product } from '../types/product';

export async function getProductById(productId: number): AxiosPromise<Product> {
  return api.get(`products/${productId}`);
}

export async function createProduct(body: Record<string, any>): AxiosPromise<Product> {
  return api.post('products', body);
}

export async function updateProduct(productId: number, body: Record<string, any>): AxiosPromise<Product> {
  return api.put(`products/${productId}`, body);
}

export async function listProductsByGuildId(guildId: string): AxiosPromise<Product[]> {
  return api.get(`products/list/${guildId}`);
}