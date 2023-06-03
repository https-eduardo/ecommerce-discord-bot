import {
  ActionRowBuilder,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { Product } from "../../types/product";

export function createBuyModal(product: Product) {
  const modal = new ModalBuilder({
    customId: `buy-product-modal-${product.id}`,
    title: `Comprar ${product.name}`,
  });

  const email = new TextInputBuilder({
    customId: "email",
    label: "Email de compra",
    style: TextInputStyle.Short,
  });

  const emailRow =
    new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(email);

  modal.addComponents(emailRow);

  return modal;
}
