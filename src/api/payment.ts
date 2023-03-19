import { AxiosPromise } from 'axios';
import api from '.';
import { Payment } from '../types/payment';

export async function getPaymentById(paymentId: number): AxiosPromise<Payment> {
  return api.get(`payments/${paymentId}`);
}