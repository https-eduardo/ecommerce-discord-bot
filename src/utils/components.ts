import { ActionRowBuilder, AnyComponentBuilder, APIBaseComponent, APIMessageActionRowComponent, ButtonBuilder, ButtonStyle, Component, ComponentBuilder, ComponentType, createComponent } from 'discord.js';

interface CreateButtonArgs {
  id: string;
  label: string;
  style: ButtonStyle;
}

export function createButton({ id, label, style }: CreateButtonArgs) {
  return {
    customId: id,
    label,
    style,
  }
}

export function createActionRow() {
  return new ActionRowBuilder({
    type: ComponentType.ActionRow,
  });
}