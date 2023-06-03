import { Client, TextChannel } from "discord.js";
import express from "express";
import {
  deletePurchaseChannel,
  getPurchaseChannelId,
} from "./utils/purchase-channel";

const app = express();
app.use(express.json());

export function registerRoutes(client: Client) {
  // On order finish
  app.post("/order-finish", async (req, res) => {
    const { status, authorDiscordId } = req.body;

    if (!authorDiscordId || !status)
      return res.status(400).json({ message: "Invalid Body." });
    const channelId = getPurchaseChannelId(authorDiscordId);
    if (!channelId)
      return res.status(400).json({ message: "Channel not found." });

    const channel = await client.channels.fetch(channelId);
    if (!channel) return;

    if (status === "success") {
      const textChannel = channel as TextChannel;
      textChannel.send(
        `> Compra aprovada. Enviamos os dados de sua compra via email. Esse canal será apagado em 1 minuto.`
      );
      setTimeout(() => deletePurchaseChannel(channel), 60000);
    }

    return res.status(200).json({ message: "Order finished" });
  });
  app.listen(8080);
}
