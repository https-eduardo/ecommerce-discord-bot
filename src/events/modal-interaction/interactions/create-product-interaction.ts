import { ChannelType, ModalSubmitInteraction } from 'discord.js';
import { createProduct } from '../../../api/product';
import { sendBuyEmbedMessage } from '..';

export async function handleCreateProductSubmit(
  interaction: ModalSubmitInteraction,
  requestBody: Record<string, any>
) {
  const channel = await interaction.guild?.channels.create({
    name: requestBody.name,
    type: ChannelType.GuildText,
  });
  if (channel) {
    try {
      const { data: product } = await createProduct({
        ...requestBody,
        discordChannelId: channel.id,
        discordGuildId: channel.guildId,
      });
      interaction.reply({
        content: `Canal de venda criado: ${channel.toString()}`,
        ephemeral: true,
      });
      sendBuyEmbedMessage(channel, product.id);
    } catch {
      interaction.reply({
        content: "Não foi possível criar o canal de venda.",
        ephemeral: true,
      });
    }
  }
  interaction.message?.delete();
}