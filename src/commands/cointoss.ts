import { Command } from "../structures/Command";

export default new Command({
    name: "cointoss",
    description: "gives heads or tails",
    run: ({ interaction }) => {
        let choice = Math.floor(Math.random() * 2);
        interaction.followUp(choice === 1 ? "Heads!" : "Tails!");
    }
});