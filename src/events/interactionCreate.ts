import { Event } from "../structures/Event";
import { client } from "..";
import { CommandInteractionOptionResolver } from "discord.js";
import { ExtendedInteraction } from "../types/Command";

export default new Event("interactionCreate", async (interaction) => {

    // Chat Input Commands
    if (interaction.isCommand()) {
        // Gives the user the "bot is thinking..."
        // message if the bot takes longer than 3 seconds.
        // Very useful
        await interaction.deferReply();

        const command = client.commands.get(interaction.commandName);
        if (!command) {
            return interaction.followUp("Command not valid!");
        }

        command.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction
        });
    }
});