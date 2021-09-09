const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');




module.exports = {
	data: new SlashCommandBuilder()
		.setName('pleasegoaway')
		.setDescription('Gently, asks to go away'),

	    async execute(interaction) {
            const connection = getVoiceConnection(interaction.guild.id);
            connection.destroy();
            await interaction.reply('cya soon :)')
	    },
};
