import { Product } from "../types/product";
import { getProductInfoEmbed } from "./product-embed";

export function getStockEmbed(product: Product) {
  const embed = getProductInfoEmbed(product);
  embed.setTitle("Gerenciar estoque");
  embed.setDescription(`Produto: ${product.name}`);

  return embed;
}
