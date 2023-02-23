export interface Order {
  email: string;
  productId: number;
  status: string;
  authorDiscordId: string;
  paymentId: number;
  createdAt: Date;
  updatedAt: Date;
}