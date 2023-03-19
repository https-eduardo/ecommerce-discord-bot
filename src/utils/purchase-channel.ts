import { ModalSubmitInteraction, ChannelType, Channel, GuildMember } from 'discord.js';
import { PurchaseChannel } from '../types/purchase-channel';

const purchaseChannels: PurchaseChannel = {};

export function getPurchaseChannelId(userId: string) {
  return purchaseChannels[userId];
}

export function deletePurchaseChannel(channel: Channel) {
  const purchaseChannel = Object.entries(purchaseChannels).find(([_, value]) => value === channel.id);
  if (!purchaseChannel) return;

  const [authorId] = purchaseChannel;
  delete purchaseChannels[authorId];
  channel.delete();
}

export async function createPurchaseChannel(interaction: ModalSubmitInteraction) {
  if (!interaction.guild || !interaction.member) return;
  const everyoneRole = interaction.guild.roles.everyone;
  const author = interaction.member as GuildMember;

  if (purchaseChannels[interaction.user.id]) throw new Error('Cannot create another purchase channel. The user already have one.');
  const channel = await interaction.guild.channels.create({ name: `carrinho-${interaction.user.username}`, type: ChannelType.GuildText });
  if (!channel) return;
  channel.permissionOverwrites.create(interaction.client.user, { ViewChannel: true });
  channel.permissionOverwrites.create(author, { ViewChannel: true });
  channel.permissionOverwrites.create(everyoneRole, { ViewChannel: false });

  purchaseChannels[interaction.user.id] = channel.id;
  return channel;
}