import { StringSelectMenuInteraction } from 'discord.js';
import { getStockItemById } from '../../../api/stock-item';
import { editStockItemModal } from '../../../modals/stock-item/edit-stock-item-modal';

export async function handleEditStockItem(
  interaction: StringSelectMenuInteraction
) {
  const stockItemId = interaction.values[0];
  try {
    const { data: stockItem } = await getStockItemById(+stockItemId);
    const modal = editStockItemModal(stockItem);
    interaction.showModal(modal);
  } catch {}
}
