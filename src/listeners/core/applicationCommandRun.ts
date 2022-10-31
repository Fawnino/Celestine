import { Listener } from "#lib/structures";
import { InteractionType } from "discord.js";
import { cyan, greenBright, underline } from "colorette";

export default new Listener({
	event: "interactionCreate",
	async run(interaction) {
		const { client } = interaction;
		if (
			interaction.isChatInputCommand() ||
			interaction.isContextMenuCommand()
		) {
			const command = client.commands.get(interaction.commandName);
			if (command && command.commandRun) {
				if (command.ownerOnly && !client.ownerIds.includes(interaction.user.id))
					return;
				await command
					.commandRun(interaction)
					.catch((e) => client.logger.error(e.stack));

				client.logger.info(
					underline(cyan(`${interaction.user.tag} // ${interaction.user.id}`)) +
						` used ` +
						underline(greenBright(`${command.name}`)) +
						` in ` +
						underline(
							cyan(`${interaction.guild!.name} // ${interaction.guild!.id}`),
						),
				);
			}
		}

		if (interaction.type === InteractionType.ApplicationCommandAutocomplete) {
			const command = client.commands.get(interaction.commandName);

			if (command && command.autoCompleteRun && command.commandRun) {
				if (command.ownerOnly && !client.ownerIds.includes(interaction.user.id))
					return;

				if (command.name !== interaction.commandName) return;

				await command
					.autoCompleteRun(interaction)
					.catch((e) => client.logger.error(e.stack));
			}
		}
	},
});
