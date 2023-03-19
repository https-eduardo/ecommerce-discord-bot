import { AxiosPromise } from 'axios';
import api from '.';
import { Order } from '../types/order';

export async function getOrderById(orderId: number): AxiosPromise<Order> {
  return api.get(`orders/${orderId}`);
}

export async function createOrder(body: Record<string, any>): AxiosPromise<Order> {
  return api.post('orders', body);
}
