import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, Client, ModalSubmitInteraction, TextChannel } from 'discord.js';
import { getProductIdFromComponentId } from '.';
import { createProduct, getProductById, updateProduct } from '../api/product';
import { getProductInfoEmbed } from '../utils/embed';

export function onModalInteraction(client: Client) {
  client.on('interactionCreate', (interaction) => {
    if (interaction.isModalSubmit())
      handleModalSubmitInteraction(interaction);
  });
}

async function handleModalSubmitInteraction(interaction: ModalSubmitInteraction) {
  const modalCustomId = interaction.customId;
  const submitFields = interaction.fields;
  const requestBody: Record<string, any> = {};
  const productId = getProductIdFromComponentId(modalCustomId);

  for (let [fieldName] of submitFields.fields) {
    let value: string | number = submitFields.getTextInputValue(fieldName);
    if (value.length === 0) continue;
    if (fieldName === 'price') value = +value;
    requestBody[fieldName] = value;
  }

  if (modalCustomId.startsWith('edit-product-modal') && productId)
    handleEditSubmit(interaction, requestBody, productId);
  else if (modalCustomId.startsWith('create-product-modal'))
    handleCreateSubmit(interaction, requestBody);
}

async function handleEditSubmit(interaction: ModalSubmitInteraction, requestBody: Record<string, any>, productId: string) {
  try {
    const { data: oldProduct } = await getProductById(+productId);
    // This enables to delete the optional fields
    if (oldProduct.imageUrl && !requestBody.imageUrl)
      requestBody.imageUrl = null;
    if (oldProduct.instructions && !requestBody.instructions)
      requestBody.instructions = null;

    const { data: product } = await updateProduct(+productId, requestBody);
    const channel = interaction.guild?.channels.cache.get(product.discordChannelId) as TextChannel;
    if (channel) {
      await channel.bulkDelete(100, true);
      sendBuyEmbedMessage(channel, product.id);
    }
    interaction.reply({ content: `Produto editado com sucesso!`, ephemeral: true });
  } catch {
    interaction.reply({ content: 'Não foi possível editar o produto!', ephemeral: true });
  }
  interaction.message?.delete();
}

async function handleCreateSubmit(interaction: ModalSubmitInteraction, requestBody: Record<string, any>) {
  const channel = await interaction.guild?.channels.create({ name: requestBody.name, type: ChannelType.GuildText });
  if (channel) {
    try {
      const { data: product } = await createProduct({
        ...requestBody, discordChannelId: channel.id,
        discordGuildId: channel.guildId
      });
      interaction.reply({ content: `Canal de venda criado: ${channel.toString()}`, ephemeral: true });
      sendBuyEmbedMessage(channel, product.id);
    } catch {
      interaction.reply({ content: 'Não foi possível criar o canal de venda.', ephemeral: true })
    }
  }
  interaction.message?.delete();
}

async function sendBuyEmbedMessage(channel: TextChannel, productId: number) {
  try {
    const { data: product } = await getProductById(productId);
    const productEmbed = getProductInfoEmbed(product);

    const buyButton = new ButtonBuilder()
      .setCustomId(`buy-product-${productId}`)
      .setLabel('Comprar')
      .setStyle(ButtonStyle.Success);
    // @ts-ignore
    channel.send({ embeds: [productEmbed], components: [new ActionRowBuilder({ components: [buyButton] })] });
  } catch {
  }
}