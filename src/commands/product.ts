import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, Interaction, Message, SlashCommandBuilder, SlashCommandStringOption, SlashCommandSubcommandBuilder, SlashCommandSubcommandGroupBuilder } from 'discord.js';
import { CustomCommandHandler } from '.';
import api from '../api';
import { Product } from '../types/product';
import { getProductInfoEmbed } from '../utils/embed';

const productsCommand: CustomCommandHandler = {
  data: new SlashCommandBuilder()
    .setName('produtos')
    .setDescription('Gerenciar produtos que serão comercializados no seu servidor.')
    .addSubcommand((subcommand) => subcommand.setName('criar').setDescription('Cria um produto'))
    .addSubcommand((subcommand) => subcommand.setName('listar').setDescription('Lista os produtos do servidor')).toJSON(),
  handler: handleProductCommand
}

export async function handleProductCommand(interaction: CommandInteraction) {
  const subCommand = interaction.options.data[0].name;
  if (!subCommand) return sendHelpMessage(interaction);
  switch (subCommand) {
    case 'ajuda':
      sendHelpMessage(interaction);
      break;
    case 'criar':
      await createProduct(interaction);
      break;
    case 'listar':
      await listProducts(interaction);
      break;
  }
}

function sendHelpMessage(interaction: CommandInteraction) {
  interaction.reply('Ajuda');
}

async function createProduct(interaction: CommandInteraction) {
  const button = new ButtonBuilder()
    .setCustomId(`create-product`)
    .setLabel(`Criar novo produto`)
    .setStyle(ButtonStyle.Primary)
  //@ts-ignore
  interaction.reply({ components: [new ActionRowBuilder().setComponents(button)] })
}

async function listProducts(interaction: CommandInteraction) {
  try {
    const { data: products } = await api.get(`products/list/${interaction.guildId}`);
    if (products) {
      products.forEach((product: Product) => {
        const embed = getProductInfoEmbed(product);
        const button = new ButtonBuilder()
          .setCustomId(`edit-product-${product.id}`)
          .setLabel('Editar')
          .setStyle(ButtonStyle.Secondary)

        interaction.channel?.send({
          embeds: [embed],
          components:
            // @ts-ignore
            [new ActionRowBuilder().setComponents(button)]
        });
      });
    }
  } catch {
    interaction.channel?.send('Não foi possível listar os produtos. Tente novamente mais tarde.')
  }
}
export { productsCommand };