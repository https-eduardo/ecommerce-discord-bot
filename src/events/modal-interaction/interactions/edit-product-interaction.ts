import { ModalSubmitInteraction, TextChannel } from "discord.js";
import { getProductById, updateProduct } from "../../../api/product";
import { sendBuyEmbedMessage } from "..";

export async function handleEditProductSubmit(
  interaction: ModalSubmitInteraction,
  requestBody: Record<string, any>,
  productId?: number
) {
  if (!productId) return;
  try {
    const { data: oldProduct } = await getProductById(productId);
    // This enables to delete the optional fields
    if (oldProduct.imageUrl && !requestBody.imageUrl)
      requestBody.imageUrl = null;
    if (oldProduct.instructions && !requestBody.instructions)
      requestBody.instructions = null;
    const { data: product } = await updateProduct(+productId, requestBody);
    const channel = interaction.guild?.channels.cache.get(
      product.discordChannelId
    ) as TextChannel;
    if (channel) {
      await channel.bulkDelete(100, true);
      sendBuyEmbedMessage(channel, product.id);
    }
    interaction.reply({
      content: `Produto editado com sucesso!`,
      ephemeral: true,
    });
  } catch {
    interaction.reply({
      content: "Não foi possível editar o produto!",
      ephemeral: true,
    });
  }
  interaction.message?.delete();
}
