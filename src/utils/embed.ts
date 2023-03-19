import { EmbedBuilder } from '@discordjs/builders';
import { AttachmentBuilder } from 'discord.js';
import { getPaymentById } from '../api/payment';
import { Order } from '../types/order';
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

export async function getOrderEmbed(order: Order) {
  const product = order.product;
  const embed = new EmbedBuilder({
    color: 0x20ff10,
    title: 'Resumo do pedido',
    description: 'Faça o pagamento do seu pedido por meio do QR Code por qualquer banco. Assim que o pagamento for aprovado, você receberá seus produtos.',
    fields: [
      { name: 'Email', value: order.email },
      { name: `x1 ${product.name}`, value: `${formatPrice(product.price)}`, inline: true },
    ],
    footer: {
      text: 'O pagamento tem que ser realizado dentre de 30 minutos.'
    },
  });
  if (product.imageUrl)
    embed.setThumbnail(product.imageUrl)
  return embed;
}