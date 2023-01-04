const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Replies with server info!')
	.setDMPermission(false),
    execute(interaction) {
			interaction.guild.fetchOwner().then((owner) => {
				const embed = new EmbedBuilder()
				.setColor(0x0099FF).setTitle("Server Info")
				.setThumbnail(owner.avatarURL())
				.setAuthor ( { name: interaction.guild.name, iconURL: interaction.guild.iconURL(), url: interaction.guild.iconURL()})
				.addFields(
					{ name: "Owner", value: "" + owner.user.username },
					{ name: "Created at", value: "" + interaction.guild.createdAt },							{ name: "Members", value: "" + interaction.guild.memberCount },
					{ name: "Guild ID", value: "" + interaction.guild.id },
				)
				interaction.reply({embeds: [embed]})
			})		
	}, 
}