const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('list of awesome songs requested!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};
