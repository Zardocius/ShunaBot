const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType, AudioPlayerStatus} = require('@discordjs/voice');
const { SlashCommandBuilder} = require('@discordjs/builders');
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
require('dotenv').config()

let queue = [];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays sickest songs')
        .addStringOption(option => option.setName('song').setDescription('Spowoky Owoky Pampukin').setRequired(true)),
    async execute(interaction) {

        const channel = interaction.member.voice.channel;
        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        const input = interaction.options.getString('song');
        const player = (AudioPlayerStatus.Idle);

        async function quemanager(link) {
            if (queue[0] == undefined) {
                queue.push(link);
                await playit ();
            } else {
                queue.push(link);
                await interaction.reply({ content: '***Added to queue:  ***' + link, ephemeral: false })
            }
        }
        

        //player function
           async function playit() {
            const stream = ytdl(queue[0], { filter: 'audioonly' });
            const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
            const player = createAudioPlayer();

            player.on(AudioPlayerStatus.Idle, () => checkQueue(queue));
            const checkQueue = (queue) => {
                queue.shift();
                if (queue[0] != undefined) {
                    playit ()
                    
                }
            }

                player.play(resource);
                connection.subscribe(player);
                player.on(AudioPlayerStatus.Playing, () => {
                    console.log('The audio player has started playing:');
                });
                interaction.reply({ content: '***Now Playing:  ***' + queue[0], ephemeral: false })
        }

        // Link Makers
        if (ytdl.getURLVideoID(input)) {
           await quemanager(input)
        }

        else {
            const searchResults = await ytsr(input, { limit: 1 }, { type: 'video' });
            await quemanager(searchResults.items[0].url)
        }
    }
}