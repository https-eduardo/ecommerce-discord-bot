import {
  ActionRowBuilder,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

export function createProductModal() {
  const modal = new ModalBuilder({
    customId: "create-product-modal",
    title: "Criar produto",
  });

  const name = new TextInputBuilder({
    customId: "name",
    label: "Nome do produto",
    style: TextInputStyle.Short,
    minLength: 3,
  });
  const description = new TextInputBuilder({
    customId: "description",
    label: "Descrição do produto",
    minLength: 8,
    style: TextInputStyle.Paragraph,
  });

  const price = new TextInputBuilder({
    customId: "price",
    label: "Preço do produto",
    minLength: 1,
    style: TextInputStyle.Short,
  });

  const instructions = new TextInputBuilder({
    customId: "instructions",
    label: "Instruções do produto",
    placeholder: "Ative a chave através de nosso site.",
    required: false,
    style: TextInputStyle.Paragraph,
  });

  const imageUrl = new TextInputBuilder({
    customId: "imageUrl",
    label: "Imagem do produto",
    placeholder: "https://i.imgur.com/hPMC21L.png",
    required: false,
    style: TextInputStyle.Short,
  });

  const nameRow =
    new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(name);
  const priceRow =
    new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(price);
  const descriptionRow =
    new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
      description
    );
  const instructionsRow =
    new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
      instructions
    );
  const imageUrlRow =
    new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
      imageUrl
    );

  modal.addComponents(
    nameRow,
    priceRow,
    descriptionRow,
    instructionsRow,
    imageUrlRow
  );

  return modal;
}
