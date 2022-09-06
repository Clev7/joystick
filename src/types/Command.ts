import { ChatInputApplicationCommandData, CommandInteraction, CommandInteractionOptionResolver, PermissionResolvable } from "discord.js";
import { ExtendedClient } from "../structures/Client";

interface RunOptions {
    client: ExtendedClient,
    interaction: CommandInteraction,
    args: CommandInteractionOptionResolver
}

type RunFunction = (options: RunOptions) => any;

// Essentially says that a command
// has the basic info for a slash command
// along with other information mentioned
// here

// & means that it strictly contains
// everything from the braces AND
// the type
export type CommandType = {
    userPermissions?: PermissionResolvable[] ;
    cooldown: number;
    run: RunFunction;
} & ChatInputApplicationCommandData