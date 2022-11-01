import { Command } from "#lib/structures";
import fetch from "node-fetch";
import { CommandType } from "#lib/enums";
import { EmbedBuilder, ApplicationCommandOptionType } from "discord.js";

export default new Command({
	category: "Fun",
	type: CommandType.ChatInput,
	description: "Manipulate images!",
	options: [
		{
			name: "drake",
			description: "Manipulate a drake image.",
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "yes-text",
					description: "Text that drake likes.",
					type: ApplicationCommandOptionType.String,
					required: true,
				},
				{
					name: "no-text",
					description: "Text that drake likes.",
					type: ApplicationCommandOptionType.String,
					required: true,
				},
			],
		},
		{
			name: "panik-kalm-panik",
			description: "Manipulate a panik-kalm-panik image.",
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "panik",
					description: "1st text to panik about.",
					type: ApplicationCommandOptionType.String,
					required: true,
				},
				{
					name: "kalm",
					description: "1st text to be kalm about.",
					type: ApplicationCommandOptionType.String,
					required: true,
				},
				{
					name: "panik2",
					description: "2nd text to panik about.",
					type: ApplicationCommandOptionType.String,
					required: true,
				},
			],
		},
		{
			name: "gay",
			description: "Turn someone gay.",
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "user",
					description: "User to turn gay.",
					type: ApplicationCommandOptionType.User,
					required: false,
				},
			],
		},
		{
			name: "pixelate",
			description: "Pixelate someones avatar.",
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "user",
					description: "User to pixelate their avatar.",
					type: ApplicationCommandOptionType.User,
					required: false,
				},
			],
		},
		{
			name: "burn",
			description: "Make spongebob burn a text.",
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "text",
					description: "Text to burn.",
					type: ApplicationCommandOptionType.String,
					required: true,
				},
			],
		},
		{
			name: "caution",
			description: "CAUTION NO BITCHES!",
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "text",
					description: "Text to caution.",
					type: ApplicationCommandOptionType.String,
					required: true,
				},
			],
		},
	],
	async commandRun(interaction) {
		await interaction.deferReply();
		const Types = interaction.options.getSubcommand();
		const drakeYes = interaction.options.getString("yes-text");
		const drakeNo = interaction.options.getString("no-text");
		const text = interaction.options.getString("text");
		const user = interaction.options.getUser("user") || interaction.user;
		const panik = interaction.options.getString("panik");
		const kalm = interaction.options.getString("kalm");
		const panik2 = interaction.options.getString("panik2");

		switch (Types) {
			case "drake": {
				if (drakeYes!.length >= 128)
					return interaction.followUp({
						content: "That message is too long! Try again with less words.",
						ephemeral: true,
					});
				if (drakeNo!.length >= 128)
					return interaction.followUp({
						content: "That message is too long! Try again with less words.",
						ephemeral: true,
					});

				let image = "";

				image = await fetch(
					`https://luminabot.xyz/api/image/drake?yes=${encodeURIComponent(
						drakeYes!,
					)}&no=${encodeURIComponent(drakeNo!)}`,
				).then((response) => (image = response.url));

				const drakeEmbed = new EmbedBuilder()
					.setImage(`${image}`)
					.setColor(0x5865f2);

				return interaction.followUp({ embeds: [drakeEmbed] });
			}
			case "panik-kalm-panik": {
				if (panik!.length >= 128)
					return interaction.followUp({
						content: "That message is too long! Try again with less words.",
						ephemeral: true,
					});
				if (kalm!.length >= 128)
					return interaction.followUp({
						content: "That message is too long! Try again with less words.",
						ephemeral: true,
					});
				if (panik2!.length >= 128)
					return interaction.followUp({
						content: "That message is too long! Try again with less words.",
						ephemeral: true,
					});
				let image = "";

				image = await fetch(
					`https://luminabot.xyz/api/image/panik-kalm-panik?panik=${encodeURIComponent(
						panik!,
					)}&kalm=${encodeURIComponent(kalm!)}&panik2=${encodeURIComponent(
						panik2!,
					)}`,
				).then((response) => (image = response.url));

				const pkp = new EmbedBuilder().setImage(`${image}`).setColor(0x5865f2);

				return interaction.followUp({ embeds: [pkp] });
			}
			case "gay": {
				let image = "";

				image = await fetch(
					`https://luminabot.xyz/api/image/gay?image=${user?.displayAvatarURL({
						forceStatic: true,
						extension: "png",
					})}`,
				).then((response) => (image = response.url));

				const gayEmbed = new EmbedBuilder()
					.setImage(`${image}`)
					.setColor(0x5865f2);

				return interaction.followUp({ embeds: [gayEmbed] });
			}
			case "burn": {
				if (text!.length >= 128)
					return interaction.followUp({
						content: "That message is too long! Try again with less words.",
						ephemeral: true,
					});
				let image = "";

				image = await fetch(
					`https://luminabot.xyz/api/image/burn?text=${encodeURIComponent(
						text!,
					)}`,
				).then((response) => (image = response.url));

				const burnEmbed = new EmbedBuilder()
					.setImage(`${image}`)
					.setColor(0x5865f2);

				return interaction.followUp({ embeds: [burnEmbed] });
			}
			case "caution": {
				if (text!.length >= 128)
					return interaction.followUp({
						content: "That message is too long! Try again with less words.",
						ephemeral: true,
					});
				let image = "";

				image = await fetch(
					`https://luminabot.xyz/api/image/caution?text=${encodeURIComponent(
						text!,
					)}`,
				).then((response) => (image = response.url));

				const cautionEmbed = new EmbedBuilder()
					.setImage(`${image}`)
					.setColor(0x5865f2);
				return interaction.followUp({ embeds: [cautionEmbed] });
			}
			case "pixelate": {
				let image = "";

				image = await fetch(
					`https://some-random-api.ml/canvas/misc/pixelate?avatar=${user.displayAvatarURL(
						{ forceStatic: true, extension: "png" },
					)}`,
				).then((response) => (image = response.url));

				const pixelateEmbed = new EmbedBuilder()
					.setImage(`${image}`)
					.setColor(0x5865f2);
				return interaction.followUp({ embeds: [pixelateEmbed] });
			}
		}
	},
});