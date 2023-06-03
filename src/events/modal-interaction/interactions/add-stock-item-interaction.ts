import { ModalSubmitInteraction } from "discord.js";
import { createStockItem } from "../../../api/stock-item";

export async function handleAddStockItemSubmit(
  interaction: ModalSubmitInteraction,
  requestBody: Record<string, any>,
  productId?: number
) {
  if (!productId) return;
  try {
    const { data: stockItem } = await createStockItem({
      productId,
      ...requestBody,
    });
    interaction.reply({
      content: `O item foi adicionado no estoque com o ID: ${stockItem.id}`,
      ephemeral: true,
    });
  } catch {
    interaction.reply({
      content: "Houve um erro ao adicionar o item no estoque.",
      ephemeral: true,
    });
  }
}
