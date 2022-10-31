import { Command } from "#lib/structures";
import { CommandType } from "#lib/enums";
import { ApplicationCommandOptionType } from "discord.js";

export default new Command({
	type: CommandType.ChatInput,
	description: "DM a user.",
	options: [
		{
			name: "user",
			type: ApplicationCommandOptionType.User,
			description: "User to dm.",
			required: true,
		},
		{
			name: "message",
			description: "Message to dm the user.",
			type: ApplicationCommandOptionType.String,
			required: true,
		},
	],
	async commandRun(interaction) {
		const user = interaction.options.getUser("user", true);
		const message = interaction.options!.getString("message");

		if (user.id === interaction.client.user.id) {
			return await interaction
				.reply({
					content: "I can't DM myself, DM an actual person!",
					ephemeral: true,
				})
				.catch((err) => {
					interaction.client.logger.error(
						`Lmao a bozo tried to dm me using the dm command`,
					);
				});
		}

		user.send(`${message}`).catch(async (err) => {
			interaction.client.logger.error(`DM Error: ${err}`);

			return await interaction
				.reply({
					content: `❌ | Failed to send that message, please try again`,
				})
				.catch((err) => {
					interaction.client.logger.error(`DM Command Error: ${err}`);
				});
		});

		await interaction
			.reply({
				content: `📨 | **${message}** successsfully sent to **${user}**!`,
				ephemeral: true,
			})
			.catch((err) => {
				interaction.client.logger.error(`DM Command Error: ${err}`);
			});
	},
});
