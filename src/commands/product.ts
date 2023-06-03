import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CommandInteraction,
  MessageActionRowComponentBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import { CustomCommandHandler } from ".";
import { listProductsByGuildId } from "../api/product";
import { getProductInfoEmbed } from "../embeds/product-embed";

const productsCommand: CustomCommandHandler = {
  data: new SlashCommandBuilder()
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setName("produtos")
    .setDescription(
      "Gerenciar produtos que serão comercializados no seu servidor."
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("criar").setDescription("Cria um produto")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("listar")
        .setDescription("Lista os produtos do servidor")
    )
    .toJSON(),
  handler: handleProductCommand,
};

export async function handleProductCommand(interaction: CommandInteraction) {
  const subCommand = interaction.options.data[0].name;
  switch (subCommand) {
    case "criar":
      await createProduct(interaction);
      break;
    case "listar":
      await listProducts(interaction);
      break;
  }
}

async function createProduct(interaction: CommandInteraction) {
  const button = new ButtonBuilder()
    .setCustomId(`create-product`)
    .setLabel(`Criar novo produto`)
    .setStyle(ButtonStyle.Primary);
  interaction.reply({
    components: [
      new ActionRowBuilder<MessageActionRowComponentBuilder>().setComponents(
        button
      ),
    ],
  });
}

async function listProducts(interaction: CommandInteraction) {
  try {
    if (!interaction.guildId) return;
    const { data: products } = await listProductsByGuildId(interaction.guildId);

    if (products) {
      for (const product of products) {
        const embed = getProductInfoEmbed(product);

        const button = new ButtonBuilder()
          .setCustomId(`edit-product-${product.id}`)
          .setLabel("Editar")
          .setStyle(ButtonStyle.Secondary);

        const stockButton = new ButtonBuilder()
          .setCustomId(`stock-product-${product.id}`)
          .setLabel("Gerenciar estoque")
          .setStyle(ButtonStyle.Secondary);

        interaction.channel?.send({
          embeds: [embed],
          components: [
            new ActionRowBuilder<MessageActionRowComponentBuilder>().setComponents(
              button,
              stockButton
            ),
          ],
        });
      }
      interaction.reply({ content: "Produtos listados com sucesso!" });
    }
  } catch {
    interaction.reply({
      content:
        "Não foi possível listar os produtos. Tente novamente mais tarde.",
      ephemeral: true,
    });
  }
}
export { productsCommand };
