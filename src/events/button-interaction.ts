import { ButtonInteraction, Client } from 'discord.js';
import { getProductIdFromComponentId } from '.';
import { createProduct, getProductById } from '../api/product';
import { Product } from '../types/product';
import { createProductModal } from '../utils/modal';

type InteractionHandler = (interaction: ButtonInteraction, product?: Product) => void;

interface RegisteredButtonInteraction {
  [name: string]: InteractionHandler;
}

const registeredButtonsInteractions: RegisteredButtonInteraction = {
  'create-product': handleProductModal,
  'edit-product': handleProductModal
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