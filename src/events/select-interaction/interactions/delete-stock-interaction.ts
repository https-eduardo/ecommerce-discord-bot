import { StringSelectMenuInteraction } from 'discord.js';
import { getStockItemById } from '../../../api/stock-item';
import { deleteStockItemModal } from '../../../modals/stock-item/delete-stock-item-modal';

export async function handleDeleteStockItem(
  interaction: StringSelectMenuInteraction
) {
  const stockItemId = interaction.values[0];

  try {
    const { data: stockItem } = await getStockItemById(+stockItemId);
    const modal = deleteStockItemModal(stockItem);
    interaction.showModal(modal);
  } catch {}
}
