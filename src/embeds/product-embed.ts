import { EmbedBuilder } from "discord.js";
import { Product } from "../types/product";
import { formatPrice } from ".";

export function getProductInfoEmbed(product: Product) {
  const embed = new EmbedBuilder({
    color: 0x36393e,
    title: product.name,
    description: `> ${product.description}`,
    fields: [
      {
        name: "Estoque",
        value: `> ${product.stockItems.length}`,
        inline: true,
      },
      { name: "Preço", value: `> ${formatPrice(product.price)}`, inline: true },
    ],
  });
  if (product.imageUrl) embed.setThumbnail(product.imageUrl);
  return embed;
}
