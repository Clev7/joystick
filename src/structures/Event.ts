import { ClientEvents } from "discord.js";


// The type of the argument passeed to the run
// function depends on the event. If it's an
// interactionCreate, then you get an interaction.

// If it's a ready, well you get Client<true>
export class Event<Key extends keyof ClientEvents> {
   constructor(
    public event: Key,
    public run: (...args: ClientEvents[Key]) => any
   ) {
   }
}