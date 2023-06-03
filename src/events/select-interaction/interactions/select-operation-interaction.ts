import {
  ActionRowBuilder,
  MessageActionRowComponentBuilder,
  StringSelectMenuInteraction,
} from "discord.js";
import { Product } from "../../../types/product";
import { addStockItemModal } from "../../../modals/stock-item/add-stock-item-modal";
import { getStockItemsSelect } from "..";
import { getStockEmbed } from "../../../embeds/stock-embed";

export function handleOperationSelect(
  interaction: StringSelectMenuInteraction,
  product?: Product
) {
  const operationType = interaction.values[0];
  switch (operationType) {
    case "operation-add-stock":
      handleOperationAddStock(interaction, product);
      break;
    case "operation-edit-stock":
      handleOperationEditStock(interaction, product);
      break;
    case "operation-delete-stock":
      handleOperationDeleteStock(interaction, product);
      break;
  }
}

function handleOperationAddStock(
  interaction: StringSelectMenuInteraction,
  product?: Product
) {
  if (product) {
    const modal = addStockItemModal(product);
    interaction.showModal(modal);
  }
}

function handleOperationDeleteStock(
  interaction: StringSelectMenuInteraction,
  product?: Product
) {
  if (!product) return;

  const stockItemsSelect = getStockItemsSelect(product);
  stockItemsSelect.setCustomId("delete-stock-item");

  const stockEmbed = getStockEmbed(product);
  stockEmbed.setTitle("Deletar item do estoque");

  interaction.reply({
    embeds: [stockEmbed],
    components: [
      new ActionRowBuilder<MessageActionRowComponentBuilder>({
        components: [stockItemsSelect],
      }),
    ],
    ephemeral: true,
  });
}

function handleOperationEditStock(
  interaction: StringSelectMenuInteraction,
  product?: Product
) {
  if (!product) return;

  const stockItemsSelect = getStockItemsSelect(product);
  stockItemsSelect.setCustomId("edit-stock-item");

  const stockEmbed = getStockEmbed(product);
  stockEmbed.setTitle("Editar item do estoque");

  interaction.reply({
    embeds: [stockEmbed],
    components: [
      new ActionRowBuilder<MessageActionRowComponentBuilder>({
        components: [stockItemsSelect],
      }),
    ],
    ephemeral: true,
  });
}
