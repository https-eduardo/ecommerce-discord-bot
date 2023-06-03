import {
  Client,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
  StringSelectMenuOptionBuilder,
} from "discord.js";
import { getItemIdFromComponentId } from "..";
import { getProductById } from "../../api/product";
import { Product } from "../../types/product";
import { handleOperationSelect } from "./interactions/select-operation-interaction";
import { handleEditStockItem } from "./interactions/edit-stock-item-interaction";
import { handleDeleteStockItem } from "./interactions/delete-stock-interaction";

type SelectInteractionHandler = (
  interaction: StringSelectMenuInteraction,
  product?: Product
) => void;

interface RegisterSelectInteraction {
  [name: string]: SelectInteractionHandler;
}

const registeredSelectInteractions: RegisterSelectInteraction = {
  "stock-operation-select": handleOperationSelect,
  "delete-stock-item": handleDeleteStockItem,
  "edit-stock-item": handleEditStockItem,
};

export function onSelectInteraction(client: Client) {
  client.on("interactionCreate", (interaction) => {
    if (interaction.isStringSelectMenu()) handleSelectInteraction(interaction);
  });
}

async function handleSelectInteraction(
  interaction: StringSelectMenuInteraction
) {
  const customId = interaction.customId;
  for (const interactionName in registeredSelectInteractions) {
    if (customId.startsWith(interactionName)) {
      const productId = getItemIdFromComponentId(customId);
      if (!productId)
        return registeredSelectInteractions[interactionName](interaction);
      try {
        const { data: product } = await getProductById(+productId);
        registeredSelectInteractions[interactionName](interaction, product);
      } catch {}
    }
  }
}

export function getStockItemsSelect(product: Product) {
  const stockItemsOptions = product.stockItems.map((item) => {
    return new StringSelectMenuOptionBuilder({
      label: `${item.id}`,
      description: item.content,
      value: `${item.id}`,
    });
  });

  const stockItemsSelect = new StringSelectMenuBuilder()
    .setPlaceholder("Escolha o item que deseja modificar: ")
    .setOptions(stockItemsOptions);

  return stockItemsSelect;
}
