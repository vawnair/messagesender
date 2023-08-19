const dotenv = require('dotenv');
dotenv.config();

const messageSender = require('./modules/messageSender');

const TOKENS = ['x', 'x']
const BOT_TOKEN = process.env.BOT_TOKEN;
const gameId = process.env.GAMEID;
const CHANNEL_MESSAGES = [
    {
      channelId: 'x',
      messages: [
        `x`,
        `Join my Game! <https://roblox.com/games/${gameId}>`
      ]
    },
    {
      channelId: 'x',
      messages: [
        `Hey, join my roblox game! <https://roblox.com/games/${gameId}> `,
        `Hey guys whats up!`,
      ]
    }
  ];
const INTERVAL = 10000; // e

// send loop using usertokens
messageSender.startSendingLoop(TOKENS, CHANNEL_MESSAGES, INTERVAL);

const botClient = messageSender.client;
botClient.login(BOT_TOKEN);
