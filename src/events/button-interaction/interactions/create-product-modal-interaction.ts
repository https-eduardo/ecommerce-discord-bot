import { ButtonInteraction } from 'discord.js';
import { createProductModal } from '../../../modals/product/create-product-modal';

export function handleCreateProductModal(interaction: ButtonInteraction) {
  const modal = createProductModal();
  interaction.showModal(modal);
}
