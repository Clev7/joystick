import { ClientEvents } from "discord.js";

// keyof means that the type itself is a string
// naming one of the keys
export class Event<Key extends keyof ClientEvents> {
   constructor(
    public event: Key,
    public run: (...args: ClientEvents[Key]) => any
   ) {

   }
}