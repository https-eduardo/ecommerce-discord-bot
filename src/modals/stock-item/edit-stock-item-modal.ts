import {
  ActionRowBuilder,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { StockItem } from "../../types/stock";

export function editStockItemModal(stockItem: StockItem) {
  const modal = new ModalBuilder({
    customId: `edit-stock-item-modal-${stockItem.id}`,
    title: `Adicionar item ao estoque`,
  });

  const content = new TextInputBuilder({
    customId: "content",
    label: "Conteudo do item",
    style: TextInputStyle.Paragraph,
    value: stockItem.content,
  });

  const contentRow =
    new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
      content
    );

  modal.addComponents(contentRow);

  return modal;
}
