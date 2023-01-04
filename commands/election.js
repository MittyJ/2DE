const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { sequelize, Election, Vote } = require('../dbInit');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('election')
		.setDescription('Fetches an election')
        .addStringOption(option =>
            option.setName('election-name')
                .setDescription('Name of the election')),
	async execute(interaction) {
        let canOneVote;
        let canTwoVote;

		sequelize.sync().then(() => {
            Election.findAll({
                where: {
                electionName: interaction.options.getString("election-name")
                }
            }).then((data) => {
                if(data[0] == null) {
                    interaction.reply("This election does not exist!")
                } else {
                    console.log("Section 1")
                    Vote.findAll({
                        where: {
                            userVote: 'f'
                        }
                    }).then((firstData) => {
                        canOneVote = firstData.length - 1

                        Vote.findAll({
                            where: {
                                userVote: 's'
                            }
                        }).then((secondData) => {
                            canTwoVote = secondData.length - 1
                            console.log("Section 2")
                            interaction.guild.members.fetch(data[0].firstCanidate).then((canidateOne) => {
                                interaction.guild.members.fetch(data[0].secondCanidate).then((canidateTwo) => {
                                    const embed = new EmbedBuilder()
                                    .setColor(0x0099FF).setTitle(interaction.options.getString("election-name"))
                                    .addFields(
                                        { name: "Canidate One", value: "" + canidateOne.user.username },
                                        { name: "Canidate Two", value: "" + canidateTwo.user.username },
                                        { name: "Canidate One Votes", value: "" + canOneVote },
                                        { name: "Canidate Two Votes", value: "" + canTwoVote },
                                    )
                                    interaction.reply({embeds: [embed]});
                                })
                            })
                        })
                    })
                }
        })
    })
	},
};