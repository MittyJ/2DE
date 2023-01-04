const { SlashCommandBuilder, PermissionsBitField} = require('discord.js');
const { sequelize, Election } = require('../dbInit');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete-election')
		.setDescription('Deletes an election')
        .addStringOption(option =>
            option.setName('election-name')
                .setDescription('Name of the election')),
	execute(interaction) {
		if (interaction.member.permissions.has([PermissionsBitField.Flags.Administrator])) {
            sequelize.sync().then(() => {
                Election.destroy({
                    where: {
                      electionName: interaction.options.getString('election-name')
                    }
                  })

                  interaction.reply(interaction.options.getString('election-name') + " has been deleted")
            })
        } else {
            interaction.reply("You do not have permission to use this command!")
        }
	},
};