const Discord = require('discord.js');
const ytdl = require('ytdl-core');

const client = new Discord.Client();

client.once('ready', () => {
  console.log('Bot is ready!');
});

client.on('message', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith('!play')) return;

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel) {
    return message.reply('You must be in a voice channel to use this command!');
  }

  const song = message.content.slice(6);
  if (!song) {
    return message.reply('Please provide a YouTube URL or video name!');
  }

  const connection = await voiceChannel.join();
  const stream = ytdl(song, { filter: 'audioonly' });
  const dispatcher = connection.play(stream);

  dispatcher.on('finish', () => {
    voiceChannel.leave();
  });
});

client.login('YOUR_BOT_TOKEN');
