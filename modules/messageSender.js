const request = require('request');
const { Client, GatewayIntentBits, TextChannel } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

function sendMessageUserToken(token, channelId, message) {
  const headers = {
    Authorization: `${token}`,
    'Content-Type': 'application/json',
  };

  const data = {
    content: message,
  };

  const options = {
    url: `https://discord.com/api/v10/channels/${channelId}/messages`,
    method: 'POST',
    headers,
    json: data,
  };

  
  request(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const botLogChannelId = 'x'; // Replace with the log channel ID for your bot
      sendMessageBotToken(botLogChannelId, `# Message sent to channel <#${channelId}> (${channelId}):
      > ${message}`);
      console.log(`Message sent to channel <#${channelId}> (${channelId})`);
    } else {
      const botLogChannelId = 'x';
      const errorMessage = error ? error.toString() : `HTTP ${response.statusCode} - ${response.statusMessage}`;
      
      sendMessageBotToken(botLogChannelId, `# Error sending to ${channelId}: ${errorMessage}`);
      console.error(`Error sending message to channel <#${channelId}> (${channelId}):`, errorMessage);
    }
  } );
}  

function sendMessageBotToken(channelId, message) {
  const channel = client.channels.cache.get(channelId);

  if (channel instanceof TextChannel) {
    channel.send(message)
      .then(() => {
        console.log(`Bot message logged in channel ${channelId}`);
      })
      .catch((error) => {
        console.error(`Error logging bot message in channel ${channelId}:`, error);
      });
  } else {
    console.error(`Channel ${channelId} not found or not a text channel`);
  }
}

function startSendingLoop(tokens, channelMessages, interval) {
  setInterval(() => {
    tokens.forEach((token) => {
      channelMessages.forEach((channelMessage) => {
        const { channelId, messages } = channelMessage;
        const randomMessageIndex = Math.floor(Math.random() * messages.length);
        const randomMessage = messages[randomMessageIndex];
        sendMessageUserToken(token, channelId, randomMessage);
      });
    });
  }, interval);
}

module.exports = { startSendingLoop, client };
