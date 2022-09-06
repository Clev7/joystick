declare global {
    namespace NodeJS {
        interface ProcessEnv {
            botToken: string;
            guildId: string;
            environment: "dev" | "prod" | "debug";
        }
    }
}

// idek what this is
export {};