const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const { sequelize, Election, Vote } = require('../dbInit');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('vote')
		.setDescription('Vote in an election!')
        .addStringOption(option =>
            option.setName('election-name')
                .setDescription('Name of the election')),
	async execute(interaction) {
        sequelize.sync().then(() => {
            Election.findAll({
                where: {
                  electionName: interaction.options.getString('election-name')
                }
              }).then((data) => {
                if (data[0] == null) {
                    console.log(data[0])
                    interaction.reply("This election does not exist!")
                    return
                }
                    interaction.guild.members.fetch(data[0].firstCanidate).then((firstCan) => {
                      interaction.guild.members.fetch(data[0].secondCanidate).then((secondCan) => {
                        const embed = new EmbedBuilder()
                    .setTitle(interaction.options.getString('election-name'))
                    .addFields(
                      { name: 'Canidate One', value: firstCan.user.username},
                      { name: 'Canidate One', value: secondCan.user.username},
                    )
                    const row = new ActionRowBuilder()
                    .addComponents(
                      new ButtonBuilder()
                      .setCustomId('f' + interaction.options.getString('election-name'))
                      .setLabel('Vote Canidate 1')
                      .setStyle(ButtonStyle.Primary),
                      new ButtonBuilder()
                      .setCustomId('s' + interaction.options.getString('election-name'))
                      .setLabel('Vote Canidate 2')
                      .setStyle(ButtonStyle.Danger)
                    );
                    interaction.reply({ embeds: [embed], components: [row]});
                      })
                    })
                    
                    
              })
        })
	},
};