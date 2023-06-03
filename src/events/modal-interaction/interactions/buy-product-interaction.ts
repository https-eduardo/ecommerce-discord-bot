import { AttachmentBuilder, ModalSubmitInteraction } from "discord.js";
import { createOrder } from "../../../api/order";
import { createPurchaseChannel } from "../../../utils/purchase-channel";
import { getOrderEmbed } from "../../../embeds/order-embed";
import { getPaymentById } from "../../../api/payment";

export async function handleBuyProductSubmit(
  interaction: ModalSubmitInteraction,
  requestBody: Record<string, any>,
  productId?: number
) {
  if (!productId) return;
  try {
    const { data: order } = await createOrder({
      productId,
      authorDiscordId: interaction.user.id,
      ...requestBody,
    });
    interaction.deferReply({ ephemeral: true });
    const channel = await createPurchaseChannel(interaction);
    if (!channel) return;

    const embed = await getOrderEmbed(order);
    const {
      data: { body: payment },
    } = await getPaymentById(order.paymentId);
    interaction.editReply({
      content: `Um canal foi criado com o produto que irá comprar e o QR Code para pagar: ${channel.toString()}`,
    });

    const qrCode = Buffer.from(
      payment.point_of_interaction.transaction_data.qr_code_base64,
      "base64"
    );
    const attachment = new AttachmentBuilder(qrCode, { name: "qrcode.png" });
    embed.setImage("attachment://qrcode.png");

    channel.send({ embeds: [embed], files: [attachment] });
  } catch {}
}
