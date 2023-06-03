import { Client } from "discord.js";
import { onCommandInteraction } from "./command-interaction";
import { onButtonInteraction } from "./button-interaction";
import { onModalInteraction } from "./modal-interaction";
import { onSelectInteraction } from "./select-interaction";

export default function registerListeners(client: Client) {
  onButtonInteraction(client);
  onCommandInteraction(client);
  onModalInteraction(client);
  onSelectInteraction(client);
}

export function getItemIdFromComponentId(customId: string) {
  const splitParts = customId.split("-");
  return splitParts.find((part) => parseInt(part));
}
