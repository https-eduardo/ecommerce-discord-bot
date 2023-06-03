import { ModalSubmitInteraction } from "discord.js";
import { deleteStockItem } from "../../../api/stock-item";

export async function handleDeleteStockItemSubmit(
  interaction: ModalSubmitInteraction,
  requestBody: Record<string, any>,
  stockId?: number
) {
  if (!stockId) return;
  try {
    await deleteStockItem(stockId);
    interaction.reply({
      content: "O item foi atualizado com sucesso!",
      ephemeral: true,
    });
  } catch {
    interaction.reply({
      content: "Houve um erro ao atualizar o item do estoque.",
      ephemeral: true,
    });
  }
}
