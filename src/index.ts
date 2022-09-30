import { ExtendedClient } from "./structures/Client";
import * as dotenv from "dotenv";
dotenv.config();

export const client = new ExtendedClient();
client.start();