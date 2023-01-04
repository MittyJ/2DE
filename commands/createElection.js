const { SlashCommandBuilder, PermissionsBitField} = require('discord.js');
const { sequelize, Election } = require('../dbInit');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create-election')
		.setDescription('Creates a new election')
        .addUserOption(option =>
            option.setName('canidate-one')
                .setDescription('First canidate in the election'))
        .addUserOption(option =>
            option.setName('canidate-two')
                .setDescription('Second canidate in the election'))
        .addStringOption(option =>
            option.setName('election-name')
                .setDescription('Name of the election')),
	execute(interaction) {
		if (interaction.member.permissions.has([PermissionsBitField.Flags.Administrator])) {
            sequelize.sync().then(() => {
                Election.create({
                    electionName: interaction.options.getString("election-name"),
                    firstCanidate: interaction.options.getUser('canidate-one').id,
                    secondCanidate: interaction.options.getUser('canidate-two').id,
                })

                interaction.reply("A new election between " + interaction.options.getUser('canidate-one').username + 
                " and " + interaction.options.getUser('canidate-two').username + " has been created");
            })
        } else {
            interaction.reply("You do not have permission to use this command!")
        }
	},
};