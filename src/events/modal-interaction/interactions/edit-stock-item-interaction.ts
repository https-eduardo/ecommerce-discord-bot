import { ModalSubmitInteraction } from "discord.js";
import { updateStockItem } from "../../../api/stock-item";

export async function handleEditStockItemSubmit(
  interaction: ModalSubmitInteraction,
  requestBody: Record<string, any>,
  stockId?: number
) {
  if (!stockId) return;
  try {
    await updateStockItem(stockId, {
      ...requestBody,
    });
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
