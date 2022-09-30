/* eslint-disable  @typescript-eslint/no-explicit-any*/
import { ChatInputApplicationCommandData, CommandInteraction, CommandInteractionOptionResolver, GuildMember, PermissionResolvable } from "discord.js";
import { ExtendedClient } from "../structures/Client";

export interface ExtendedInteraction extends CommandInteraction {
    member: GuildMember;
}

interface RunOptions {
    client: ExtendedClient,
    interaction: ExtendedInteraction,
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
    userPermissions?: PermissionResolvable[],
    aliases?: string[],
    run: RunFunction
} & ChatInputApplicationCommandData;