import { EmbedBuilder } from "discord.js";
import { Order } from "../types/order";
import { formatPrice } from ".";

export async function getOrderEmbed(order: Order) {
  const product = order.product;
  const embed = new EmbedBuilder({
    color: 0x20ff10,
    title: "Resumo do pedido",
    description:
      "Faça o pagamento do seu pedido por meio do QR Code por qualquer banco. Assim que o pagamento for aprovado, você receberá seus produtos.",
    fields: [
      { name: "Email", value: order.email },
      {
        name: `x1 ${product.name}`,
        value: `${formatPrice(product.price)}`,
        inline: true,
      },
    ],
    footer: {
      text: "O pagamento tem que ser realizado dentre de 30 minutos.",
    },
  });
  if (product.imageUrl) embed.setThumbnail(product.imageUrl);
  return embed;
}
