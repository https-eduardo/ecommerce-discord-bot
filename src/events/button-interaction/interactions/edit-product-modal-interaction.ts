import { ButtonInteraction } from 'discord.js';
import { editProductModal } from '../../../modals/product/edit-product-modal';
import { Product } from '../../../types/product';

export function handleEditProductModal(
  interaction: ButtonInteraction,
  product?: Product
) {
  if (product) {
    const modal = editProductModal(product);
    interaction.showModal(modal);
  }
}