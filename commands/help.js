const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Guide to all bot commands!')
		.setDMPermission(false),
	async execute(interaction) {
        interaction.reply("This feature is not complete")
	},
};