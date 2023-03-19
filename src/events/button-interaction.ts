import { ButtonInteraction, Client } from 'discord.js';
import { getProductIdFromComponentId } from '.';
import { createProduct, getProductById } from '../api/product';
import { Product } from '../types/product';
import { createBuyModal, createProductModal } from '../utils/modal';

type InteractionHandler = (interaction: ButtonInteraction, product?: Product) => void;

interface RegisteredButtonInteraction {
  [name: string]: InteractionHandler;
}

const registeredButtonsInteractions: RegisteredButtonInteraction = {
  'create-product': handleProductModal,
  'edit-product': handleProductModal,
  'buy-product': handleBuyProductInteraction,
}

export function onButtonInteraction(client: Client) {
  client.on('interactionCreate', (interaction) => {
    if (interaction.isButton())
      handleButtonInteraction(interaction);
  });
}

function handleProductModal(interaction: ButtonInteraction, product?: Product) {
  const modal = createProductModal(product);
  interaction.showModal(modal);
}

async function handleBuyProductInteraction(interaction: ButtonInteraction, product?: Product) {
  if (!product) return;
  if (product.stockItems.length <= 0)
    return interaction.reply({ content: 'Produto sem estoque, aguarde o estoque ser reeabastecido ou contate um administrador.', ephemeral: true })
  const modal = createBuyModal(product);
  interaction.showModal(modal);
}

async function handleButtonInteraction(interaction: ButtonInteraction) {
  const customId = interaction.customId;
  for (const interactionName in registeredButtonsInteractions) {
    if (customId.startsWith(interactionName)) {
      const productId = getProductIdFromComponentId(customId);
      if (!productId)
        return registeredButtonsInteractions[interactionName](interaction);
      try {
        const { data: product } = await getProductById(+productId);
        registeredButtonsInteractions[interactionName](interaction, product);
      } catch { }
    }
  }
}