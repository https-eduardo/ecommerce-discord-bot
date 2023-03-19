import { Product } from './product';

export interface Order {
  email: string;
  product: Product;
  status: string;
  authorDiscordId: string;
  paymentId: number;
  createdAt: Date;
  updatedAt: Date;
}