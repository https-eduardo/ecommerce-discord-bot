import { ButtonInteraction } from 'discord.js';
import { Product } from '../../../types/product';
import { createBuyModal } from '../../../modals/product/buy-product-modal';

export async function handleBuyProductInteraction(
  interaction: ButtonInteraction,
  product?: Product
) {
  if (!product) return;
  if (product.stockItems.length <= 0)
    return interaction.reply({
      content:
        "Produto sem estoque, aguarde o estoque ser reeabastecido ou contate um administrador.",
      ephemeral: true,
    });
  const modal = createBuyModal(product);
  interaction.showModal(modal);
}
