const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Guide to all bot commands!')
		.setDMPermission(false),
	async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle("2DE Commands")
                .addFields(
                    { name: "/election", value: "Shows information on a certain election"},
					{ name: "/elections", value: "Shows names of all current elections"},
					{ name: "/vote", value: "Allows you to vote in a certain election"},
                    )
            interaction.reply({embeds: [embed]});
	},
};