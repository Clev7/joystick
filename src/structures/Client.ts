import { Client, Collection } from "discord.js";
import { CommandType } from "../types/Command";

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

    async registerModules() {

    }
}