const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');




module.exports = {
	data: new SlashCommandBuilder()
		.setName('fuckoff')
		.setDescription('Fucks the off'),

	    async execute(interaction) {
            const connection = getVoiceConnection(interaction.guild.id);
            connection.destroy();
            await interaction.reply('okie :(')
	    },
};
