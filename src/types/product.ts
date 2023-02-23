import { Channel } from 'discord.js';
import { StockItem } from './stock';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  instructions?: string;
  stockItems: StockItem[],
  channel: Channel,
}
