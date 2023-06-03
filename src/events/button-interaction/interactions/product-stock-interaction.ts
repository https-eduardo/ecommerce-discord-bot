import { ActionRowBuilder, ButtonInteraction, MessageActionRowComponentBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from 'discord.js';
import { Product } from '../../../types/product';
import { getStockEmbed } from '../../../embeds/stock-embed';

export async function handleProductStockInteraction(
  interaction: ButtonInteraction,
  product?: Product
) {
  if (!product) return;
  const embed = getStockEmbed(product);

  const operationSelect = new StringSelectMenuBuilder()
    .setCustomId(`stock-operation-select-${product.id}`)
    .setPlaceholder("Selecione a operação que deseja realizar")
    .setOptions(
      new StringSelectMenuOptionBuilder()
        .setLabel("Adicionar")
        .setDescription("Adiciona um item ao estoque deste produto.")
        .setValue(`operation-add-stock`),
      new StringSelectMenuOptionBuilder()
        .setLabel("Deletar")
        .setDescription("Deleta um item do estoque deste produto.")
        .setValue(`operation-delete-stock`),
      new StringSelectMenuOptionBuilder()
        .setLabel("Editar")
        .setDescription("Edita um item do estoque deste produto.")
        .setValue(`operation-edit-stock`)
    );

  interaction.reply({
    embeds: [embed],
    components: [
      new ActionRowBuilder<MessageActionRowComponentBuilder>({
        components: [operationSelect],
      }),
    ],
    ephemeral: true,
  });
}
