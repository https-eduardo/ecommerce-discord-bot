import { ButtonInteraction, Client } from "discord.js";
import { getItemIdFromComponentId } from "..";
import { getProductById } from "../../api/product";
import { Product } from "../../types/product";
import { handleProductStockInteraction } from "./interactions/product-stock-interaction";
import { handleCreateProductModal } from "./interactions/create-product-modal-interaction";
import { handleEditProductModal } from "./interactions/edit-product-modal-interaction";
import { handleBuyProductInteraction } from "./interactions/buy-product-modal-interaction";

type InteractionHandler = (
  interaction: ButtonInteraction,
  product?: Product
) => void;

interface RegisteredButtonInteraction {
  [name: string]: InteractionHandler;
}

const registeredButtonsInteractions: RegisteredButtonInteraction = {
  "create-product": handleCreateProductModal,
  "edit-product": handleEditProductModal,
  "buy-product": handleBuyProductInteraction,
  "stock-product": handleProductStockInteraction,
};

export function onButtonInteraction(client: Client) {
  client.on("interactionCreate", (interaction) => {
    if (interaction.isButton()) handleButtonInteraction(interaction);
  });
}

async function handleButtonInteraction(interaction: ButtonInteraction) {
  const customId = interaction.customId;
  for (const interactionName in registeredButtonsInteractions) {
    if (customId.startsWith(interactionName)) {
      const productId = getItemIdFromComponentId(customId);
      if (!productId)
        return registeredButtonsInteractions[interactionName](interaction);
      try {
        const { data: product } = await getProductById(+productId);
        registeredButtonsInteractions[interactionName](interaction, product);
      } catch {}
    }
  }
}
