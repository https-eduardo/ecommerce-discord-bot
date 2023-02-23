import { Client, CommandInteraction } from 'discord.js';
import { commands } from '../commands';

export function onCommandInteraction(client: Client) {
  client.on('interactionCreate', (interaction) => {
    if (interaction.isCommand()) {
      commands.forEach((cmd) => {
        if (interaction.commandName === cmd.data.name) {
          return cmd.handler(interaction);
        }
      });
    }
  });
}