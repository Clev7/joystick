declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DISCORD_TOKEN: string;
            GUILD_ID: string;
            ENVIRONMENT: "dev" | "prod" | "debug";
        }
    }
}

// idek what this is
export {};