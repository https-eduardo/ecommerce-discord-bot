import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Client,
  MessageActionRowComponentBuilder,
  ModalSubmitInteraction,
  TextChannel,
} from "discord.js";
import { getItemIdFromComponentId } from "..";
import { handleAddStockItemSubmit } from "./interactions/add-stock-item-interaction";
import { handleEditStockItemSubmit } from "./interactions/edit-stock-item-interaction";
import { handleDeleteStockItemSubmit } from "./interactions/delete-stock-item-interaction";
import { handleBuyProductSubmit } from "./interactions/buy-product-interaction";
import { handleEditProductSubmit } from "./interactions/edit-product-interaction";
import { getProductById } from "../../api/product";
import { getProductInfoEmbed } from "../../embeds/product-embed";
import { handleCreateProductSubmit } from "./interactions/create-product-interaction";

type ModalInteractionHandler = (
  interaction: ModalSubmitInteraction,
  requestBody: Record<string, any>,
  argId?: number
) => void;

enum InteractionArgType {
  PRODUCT_ID = "productId",
  STOCK_ID = "stockId",
}

interface RegisteredModalInteraction {
  [name: string]: {
    handler: ModalInteractionHandler;
    argType?: InteractionArgType;
  };
}

const registeredModalInteractions: RegisteredModalInteraction = {
  "create-product-modal": {
    handler: handleCreateProductSubmit,
  },
  "edit-product-modal": {
    handler: handleEditProductSubmit,
    argType: InteractionArgType.PRODUCT_ID,
  },
  "buy-product-modal": {
    handler: handleBuyProductSubmit,
    argType: InteractionArgType.PRODUCT_ID,
  },
  "add-stock-item-modal": {
    handler: handleAddStockItemSubmit,
    argType: InteractionArgType.PRODUCT_ID,
  },
  "delete-stock-item-modal": {
    handler: handleDeleteStockItemSubmit,
    argType: InteractionArgType.STOCK_ID,
  },
  "edit-stock-item-modal": {
    handler: handleEditStockItemSubmit,
    argType: InteractionArgType.STOCK_ID,
  },
};

export function onModalInteraction(client: Client) {
  client.on("interactionCreate", (interaction) => {
    if (interaction.isModalSubmit()) handleModalSubmitInteraction(interaction);
  });
}

async function handleModalSubmitInteraction(
  interaction: ModalSubmitInteraction
) {
  const modalCustomId = interaction.customId;
  const submitFields = interaction.fields;
  const requestBody: Record<string, any> = {};
  const argId = getItemIdFromComponentId(modalCustomId);

  for (let [fieldName] of submitFields.fields) {
    let value: string | number = submitFields.getTextInputValue(fieldName);
    if (value.length !== 0) {
      if (fieldName === "price") value = +value;
      requestBody[fieldName] = value;
    }
  }

  for (const interactionName in registeredModalInteractions) {
    if (modalCustomId.startsWith(interactionName)) {
      registeredModalInteractions[interactionName].handler(
        interaction,
        requestBody,
        argId ? +argId : undefined
      );
    }
  }
}

export async function sendBuyEmbedMessage(
  channel: TextChannel,
  productId: number
) {
  try {
    const { data: product } = await getProductById(productId);
    const productEmbed = getProductInfoEmbed(product);

    const buyButton = new ButtonBuilder()
      .setCustomId(`buy-product-${productId}`)
      .setLabel("Comprar")
      .setStyle(ButtonStyle.Success);
    channel.send({
      embeds: [productEmbed],
      components: [
        new ActionRowBuilder<MessageActionRowComponentBuilder>({
          components: [buyButton],
        }),
      ],
    });
  } catch {}
}
