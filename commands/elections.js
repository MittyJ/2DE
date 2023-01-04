const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { sequelize, Election } = require('../dbInit');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('elections')
		.setDescription('Lists all current elections'),
	async execute(interaction) {
		sequelize.sync().then(() => {
            Election.findAll().then((data) => {
                if (data.length == 1) {
                    const embed = new EmbedBuilder()
                            .setTitle("Running Elections:")
                            .addFields(
                                { name: "Election 1", value: "" +  data[0].electionName},
                            )
                     interaction.reply({embeds: [embed]});

                } else if (data.length == 2) {
                    const embed = new EmbedBuilder()
                            .setTitle("Running Elections:")
                            .addFields(
                                { name: "Election 1", value: "" +  data[0].electionName},
                                { name: "Election 2", value: "" +  data[1].electionName},
                            )
                    interaction.reply({embeds: [embed]});

                } else if (data.length == 3) {
                    const embed = new EmbedBuilder()
                            .setTitle("Running Elections:")
                            .addFields(
                                { name: "Election 1", value: "" +  data[0].electionName},
                                { name: "Election 2", value: "" +  data[1].electionName},
                                { name: "Election 3", value: "" +  data[2].electionName},
                            )
                    interaction.reply({embeds: [embed]});

                } else if (data.length == 4) {
                        const embed = new EmbedBuilder()
                                .setTitle("Running Elections:")
                                .addFields(
                                    { name: "Election 1", value: "" +  data[0].electionName},
                                    { name: "Election 2", value: "" +  data[1].electionName},
                                    { name: "Election 3", value: "" +  data[2].electionName},
                                    { name: "Election 4", value: "" +  data[3].electionName},
                                )
                    interaction.reply({embeds: [embed]});

                } else if (data.length >= 5) {
                    const embed = new EmbedBuilder()
                                .setTitle("Running Elections:")
                                .addFields(
                                    { name: "Election 1", value: "" +  data[0].electionName},
                                    { name: "Election 2", value: "" +  data[1].electionName},
                                    { name: "Election 3", value: "" +  data[2].electionName},
                                    { name: "Election 4", value: "" +  data[3].electionName},
                                    { name: "Election 5", value: "" +  data[4].electionName},
                                )
                    interaction.reply({embeds: [embed]});
                }

            })
        })
	},
};