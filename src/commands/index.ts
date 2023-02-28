import { CommandInteraction, REST, Routes } from 'discord.js';
import { DISCORD_APP_ID, DISCORD_GUILD_ID, DISCORD_TOKEN } from '../config';
import { productsCommand } from './product';

export interface CustomCommandHandler {
  data: Record<string, any>;
  handler: (interaction: CommandInteraction) => void;
}
const commands: CustomCommandHandler[] = [productsCommand];

const rest = new REST({ version: '10' })
  .setToken(DISCORD_TOKEN);

(async () => {
  try {
    const body = commands.map((command) => command.data);
    await rest.put(
      Routes.applicationGuildCommands(DISCORD_APP_ID, DISCORD_GUILD_ID), { body }
    );
  } catch {
    console.log('Não foi possível carregar os comandos.');
  }
})();

export { commands };