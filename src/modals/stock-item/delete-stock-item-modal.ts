import {
  ActionRowBuilder,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { StockItem } from "../../types/stock";

export function deleteStockItemModal(stockItem: StockItem) {
  const modal = new ModalBuilder({
    customId: `delete-stock-item-modal-${stockItem.id}`,
    title: `Deletar item do estoque?`,
  });

  // This field was insert just because discord modals need to have, at least, one input
  const content = new TextInputBuilder({
    customId: "reason",
    label: "Motivo da remoção do item (opcional)",
    style: TextInputStyle.Short,
    required: false,
  });

  const contentRow =
    new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
      content
    );

  modal.addComponents(contentRow);

  return modal;
}
