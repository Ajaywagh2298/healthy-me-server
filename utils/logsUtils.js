
const axios = require('axios');

const process = require('process');
const env = process.env.HOST_ENV || 'development'; 
require('dotenv').config();

const hostConfig = require('../config/envConfig').serviceConfig[env];

async function apiErrorLogsSendTelegram(apiName, message, isError = true) {
    const statusEmoji = isError ? '🔴' : '🟢';

    const messageStyle = `
        *${statusEmoji} ------ Error ------ ${statusEmoji}:* 
        *Status:* ${apiName}
        *Report UID:* 404
        *Message:* ${message.message}
    `;

    try {
        await axios.post(hostConfig.TELEGRAM_API_URL, {
            chat_id: hostConfig.CHANNEL_ID,
            text: messageStyle,
            parse_mode: 'Markdown', 
        });
    } catch (error) {
        console.error('Failed to send message to Telegram:', JSON.parse(message));
    }
}

async function processorErrorLogsSendTelegram(message, isError = true) {
    const statusEmoji = isError ? '🔴' : '🟢';

    const messageStyle = `
        *${statusEmoji} ------ Error ------ ${statusEmoji}:* 
        *Message:* ${JSON.parse(message)}
    `;

    try {
        await axios.post(hostConfig.TELEGRAM_API_URL, {
            chat_id: hostConfig.CHANNEL_ID,
            text: messageStyle,
            parse_mode: 'Markdown', 
        });
    } catch (error) {
        console.error('Failed to send message to Telegram:', JSON.parse(message));
    }
}

module.exports = { apiErrorLogsSendTelegram , processorErrorLogsSendTelegram }