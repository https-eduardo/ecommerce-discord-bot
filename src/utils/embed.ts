import { EmbedBuilder } from '@discordjs/builders';
import { Product } from '../types/product';

const formatPrice = (price: number) => {
  return `R$${(price / 100).toFixed(2)}`;
}

export function getProductInfoEmbed(product: Product) {
  const embed = new EmbedBuilder({
    color: 0x36393e,
    title: product.name,
    description: `> ${product.description}`,
    fields: [
      { name: 'Estoque', value: `> ${product.stockItems.length}`, inline: true },
      { name: 'Preço', value: `> ${formatPrice(product.price)}`, inline: true },
    ],
  });
  if (product.imageUrl)
    embed.setThumbnail(product.imageUrl)
  return embed;
}