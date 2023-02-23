import { Client, Partials } from 'discord.js';
import { handleProductCommand } from './commands/product';
import { DISCORD_TOKEN } from './config';
import registerListeners from './events';

const client = new Client({
  intents: ['Guilds', 'DirectMessages', 'GuildMessages', 'MessageContent'],
  partials: [Partials.Channel, Partials.Message, Partials.Reaction]
});

registerListeners(client);

client.login(DISCORD_TOKEN);