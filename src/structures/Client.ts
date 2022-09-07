import { ApplicationCommandDataResolvable, Client, ClientEvents, Collection } from "discord.js";
import { CommandType } from "../types/Command";
import { Event } from "./Event";
import glob from "glob";
import { promisify } from "util";
import { RegisterCommandsOptions } from "../types/Client";

const globPromise = promisify(glob);

export class ExtendedClient extends Client {
    // It's a map from string to a command
    commands: Collection<string, CommandType> = new Collection();
    
    constructor() {
        super({intents: 32767})
    }

    start() {
        this.registerModules();
        this.login(process.env.DISCORD_TOKEN);
    }

    async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }

    async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
        // Register for only one ID
        if (guildId) {
            this.guilds.cache.get(guildId)?.commands.set(commands);
            console.log(`Registering commands to9 ${guildId}`);
        } else {
            this.application?.commands.set(commands);
            console.log("Registering global commands");
        }
    }

    async registerModules() {
        // Commands
        const slashCommands: ApplicationCommandDataResolvable[] = [];
        // This pattern means get all .ts and .js files one
        // and two subfolders deep
        const commandFiles = await globPromise(`${__dirname}/../commands/*/*{.ts,.js}`);
        console.log({ commandFiles });
        commandFiles.forEach(async filePath => {
            const command: CommandType = await this.importFile(filePath);
            if (!command.name) return;

            this.commands.set(command.name, command);
            slashCommands.push(command);
        });

        const eventFiles = await globPromise(`${__dirname}/../events/*{.ts,.js}`);
        eventFiles.forEach(async filePath => {
            const event: Event<keyof ClientEvents> = await this.importFile(filePath);

            this.on(event.event, event.run);
        })
    }
}