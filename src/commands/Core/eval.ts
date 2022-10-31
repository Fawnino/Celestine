import { CommandType } from "#lib/enums";
import { Command } from "#lib/structures";
import { ApplicationCommandOptionType } from "discord.js";
import { inspect } from "node:util";

export default new Command({
	type: CommandType.ChatInput,
	description: "Eval Some Code",
	ownerOnly: true,
	guildIds: ["1011104283237830758"], // Insert your Testing Guild ID Here
	options: [
		{
			name: "code",
			description: "The code to evaluate",
			required: true,
			type: ApplicationCommandOptionType.String,
		},
	],
	async commandRun(interaction) {
		const code = interaction.options.getString("code", true);
		const { client, channel, user, member, guild } = interaction;
		await interaction.deferReply();

		let result = await eval(code);

		if (typeof result !== "string") {
			result = inspect(result);
		}

		return interaction.editReply({
			embeds: [
				{
					description: `\`\`\`js\n${result}\n\`\`\``,
				},
			],
		});
	},
});
