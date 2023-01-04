const { Events, channelLink } = require('discord.js');
const election = require('../commands/election');
const { sequelize, Vote, Election } = require('../dbInit');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {

		if (interaction.isChatInputCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(`Error executing ${interaction.commandName}`);
				console.error(error);
			}
		} else if (interaction.isButton()) {
			let electionName = interaction.customId.slice(1, interaction.customId.length)
			Election.findAll({
				where: {
					electionName: electionName
				}
			}).then((election) => {
				if (election[0] == null) {
					interaction.reply("This election does not exist")
				} else {
					sequelize.sync().then(() => {
						Vote.destroy({
							where: {
								election: electionName,
								voter: interaction.user.id
							}
						}).then(() => {
							let voteChar;
							if (interaction.customId.charAt(0) == 'f') {
								voteChar = 'f'
							} else if (interaction.customId.charAt(0) == 's') {
								voteChar = 's'
							}
							Vote.create({
								voter: interaction.user.id,
								election: electionName,
								userVote: voteChar
							})
								interaction.reply({content: "Your vote has been filed", ephermal: true})
						})
						
					})
				}
			})
			
			
		}
		
		
	},
};