import { Client, Partials, TextChannel } from 'discord.js';
import { DISCORD_TOKEN } from './config';
import registerListeners from './events';
import { registerRoutes } from './routes';

const client = new Client({
  intents: ['Guilds', 'DirectMessages', 'GuildMessages', 'MessageContent'],
  partials: [Partials.Channel, Partials.Message, Partials.Reaction]
});

registerListeners(client);
registerRoutes(client);

client.login(DISCORD_TOKEN);
