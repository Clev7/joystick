declare global {
    namespace NodeJS {
        // There's already a definition
        // but writing interface again
        // extends the existing definition
        // to containing these fields
        interface ProcessEnv {
            DISCORD_TOKEN: string;
            GUILD_ID: string;
            ENVIRONMENT: "dev" | "prod" | "debug";
        }
    }
}

// This turns the current file into a module
// That way, none of this stuff leaks into being a global script
// file
export {};