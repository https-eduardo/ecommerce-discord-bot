import {
  ActionRowBuilder,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { Product } from "../../types/product";

export function addStockItemModal(product: Product) {
  const modal = new ModalBuilder({
    customId: `add-stock-item-modal-${product.id}`,
    title: `Adicionar item ao estoque`,
  });

  const content = new TextInputBuilder({
    customId: "content",
    label: "Conteudo do item",
    style: TextInputStyle.Paragraph,
  });

  const contentRow =
    new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
      content
    );

  modal.addComponents(contentRow);

  return modal;
}
