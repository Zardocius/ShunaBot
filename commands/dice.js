const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dice')
		.setDescription('Rolls the dice of your choise!')
        .addNumberOption(option => option.setName('d').setDescription('Dice size').setRequired(true)),
	async execute(interaction) {

        const input = interaction.options.getNumber('d');

        if (input <0) {
           
            await interaction.reply('why so negative!');

        }

        else if (input >1001) {

            await interaction.reply('Your number is too big oneechan!');

        }

        else if (input <1001) {

            const sum = Math.floor(Math.random() * input) + 1;

            await interaction.reply('You rolled ' + sum + ' 🎲'); 

        }

          }

	}
