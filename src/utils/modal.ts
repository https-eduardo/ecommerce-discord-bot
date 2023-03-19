import { ActionRowBuilder, ModalBuilder, TextInputBuilder } from 'discord.js';
import { TextInputStyle } from 'discord.js';
import { Product } from '../types/product';

export function createProductModal(product?: Product) {
  const modal = new ModalBuilder({
    custom_id: (product ? `edit-product-modal-${product.id}` : 'create-product-modal'),
    title: product ? 'Editar produto' : 'Criar produto'
  });

  const name = new TextInputBuilder({
    customId: 'name',
    label: 'Nome do produto',
    style: TextInputStyle.Short,
    minLength: 3,
  });
  const description = new TextInputBuilder({
    customId: 'description',
    label: 'Descrição do produto',
    minLength: 8,
    style: TextInputStyle.Paragraph
  });

  const price = new TextInputBuilder({
    customId: 'price',
    label: 'Preço do produto',
    minLength: 1,
    style: TextInputStyle.Short
  });

  const instructions = new TextInputBuilder({
    customId: 'instructions',
    label: 'Instruções do produto',
    placeholder: 'Ative a chave através de nosso site.',
    required: false,
    style: TextInputStyle.Paragraph
  });

  const imageUrl = new TextInputBuilder({
    customId: 'imageUrl',
    label: 'Imagem do produto',
    placeholder: 'https://i.imgur.com/hPMC21L.png',
    required: false,
    style: TextInputStyle.Short,
  });

  if (product) {
    name.setValue(product.name)
    description.setValue(product.description)
    price.setValue(product.price.toString())
    if (product.instructions)
      instructions.setValue(product.instructions)
    if (product.imageUrl)
      imageUrl.setValue(product.imageUrl);
  }

  const nameRow = new ActionRowBuilder().addComponents(name);
  const priceRow = new ActionRowBuilder().addComponents(price);
  const descriptionRow = new ActionRowBuilder().addComponents(description);
  const instructionsRow = new ActionRowBuilder().addComponents(instructions);
  const imageUrlRow = new ActionRowBuilder().addComponents(imageUrl);

  // @ts-ignore
  modal.addComponents(nameRow, priceRow, descriptionRow, instructionsRow, imageUrlRow);

  return modal;
}

export function createBuyModal(product: Product) {
  const modal = new ModalBuilder({
    custom_id: `buy-product-modal-${product.id}`,
    title: `Comprar ${product.name}`
  });

  const email = new TextInputBuilder({
    customId: 'email',
    label: 'Email de compra',
    style: TextInputStyle.Short,
  });

  const emailRow = new ActionRowBuilder().addComponents(email);

  // @ts-ignore
  modal.addComponents(emailRow);

  return modal;
}