import { ApplicationCommandDataResolvable, Client, ClientEvents, Collection } from "discord.js";
import { CommandType } from "../types/Command";
import { Event } from "./Event";
import glob from "glob";
import { promisify } from "util";
import { RegisterCommandsOptions } from "../types/Client";

const globPromise = promisify(glob);

// This is a custom client based on the Client
// Class

// Contains a map for each command name to
// the command itself
export class ExtendedClient extends Client {
    // It's a map from string to a command
    commands: Collection<string, CommandType> = new Collection();

    constructor() {
        // Starting the bot has two steps:
        // Instantiation and using start()
        super({ intents: 32767 });
    }

    start() {
        this.registerModules();
        this.login(process.env.DISCORD_TOKEN);
    }

    // This standardizes every event and command
    // to export their contents with default exports
    async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }

    // This is what actually tells the bot what commands it has.
    // It seems like it can remember what commands it had from
    // the last time this function would've been run.
    registerCommands({ commands, guildId }: RegisterCommandsOptions) {
        // Register for only one guild Id
        // as opposed to doing so globally.
        if (guildId) {
            this.guilds.cache.get(guildId)?.commands.set(commands);
            console.log(`Registering commands to ${guildId}`);
        } else {
            this.application?.commands.set(commands);
            console.log("Registering global commands");
        }
    }

    // loop
    async registerModules() {
        // Commands
        const slashCommands: ApplicationCommandDataResolvable[] = [];
        const commandFiles = await globPromise(`${__dirname}/../commands/**/*{.ts,.js}`);

        // This is actually brilliant!
        // much faster than typing console.log("commandFiles: " + commandFiles);
        // console.log({ commandFiles });

        commandFiles.forEach(async filePath => {
            const command: CommandType = await this.importFile(filePath);
            if (!command.name) return;
            console.log(command);

            this.commands.set(command.name, command);
            slashCommands.push(command);
        });

        this.on("ready", () => {
            this.registerCommands({
                commands: slashCommands,
                guildId: process.env.GUILD_ID
            });
        });

        const eventFiles = await globPromise(`${__dirname}/../events/*{.ts,.js}`);
        eventFiles.forEach(async filePath => {
            const event: Event<keyof ClientEvents> = await this.importFile(filePath);

            this.on(event.event, event.run);
        });
    }
}