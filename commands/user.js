const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Replies with user info!')
	.setDMPermission(false)
	.addUserOption(option =>
		option.setName('user')
		.setDescription('User to see information of')
		.setRequired(true)
	),
    async execute(interaction) {
			let embed = new EmbedBuilder()
				.setColor(0x0099FF)
				.setTitle(interaction.options.getUser("user").username)
				.addFields(
					{ name: 'User ID', value: interaction.options.getUser("user").id + "" },
					{ name: 'Account creation', value: interaction.options.getUser("user").createdAt + ""},
					{ name: 'Bot user', value: interaction.options.getUser("user").bot + "" }
				)
			interaction.reply({embeds: [embed], ephemeral: true})
	},
	}
