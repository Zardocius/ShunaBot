const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType, AudioPlayerStatus, AudioPlayer } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('@discordjs/builders');
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays sickest songs')
        .addStringOption(option => option.setName('song').setDescription('Spowoky Owoky Pampukin').setRequired(true)),
    async execute(interaction) {
        // const url = interaction.options.getString('url');
        // console.log(url)



        const channel = interaction.member.voice.channel;
        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        const input = interaction.options.getString('song');



        //player function
        async function playit(ytLink,name) {
            const stream = ytdl(ytLink, { filter: 'audioonly' });
            const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
            const player = createAudioPlayer();

            player.play(resource);
            connection.subscribe(player);
            player.on(AudioPlayerStatus.Playing, () => {
                console.log('The audio player has started playing: ' + name);
            });

            await interaction.reply({ content: '***Now Playing:  ***' + ytLink, ephemeral: false });
        }



        if (ytdl.validateURL(input)) {
            await playit(input)
        }



        else {
            const searchResults = await ytsr(input, { limit: 1 }, { type: 'video' });
            await playit(searchResults.items[0].url,searchResults.items[0].title)
        }
    }
}