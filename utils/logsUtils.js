
const axios = require('axios');
const os = require('os');
const Table = require('cli-table3');
const chalk = require('chalk');

const process = require('process');
const env = process.env.HOST_ENV || 'development'; 
require('dotenv').config();

const hostConfig = require('../config/envConfig').serviceConfig[env];

async function apiErrorLogsSendTelegram(apiName, message, status = 404, isError = true) {
    const statusEmoji = isError ? '🔴' : '🟢';

    const messageStyle = `
        *${statusEmoji} ------ Error ------ ${statusEmoji}:* 
        *Status:* ${apiName}
        *Report UID:* ${status}
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

const serverLogs = ( port , HOST_ENV ) => {
    const table = new Table({
        head: [chalk.blue('Property'), chalk.green('Value')],
        colWidths: [30, 50],
    });
    
    console.log(chalk.blue(`Server is running on port ${chalk.green(port)} in ${chalk.red(HOST_ENV) } Mode \n`))
    // Function to convert bytes to gigabytes
    const bytesToGB = (bytes) => (bytes / (1024 ** 3)).toFixed(2);
    
    // System data
    table.push(
        [chalk.yellow('System Architecture'), os.arch()],
        [chalk.yellow('Platform'), os.platform()],
        [chalk.yellow('Total Memory'), `${bytesToGB(os.totalmem())} GB`],
        [chalk.yellow('Free Memory'), `${bytesToGB(os.freemem())} GB`],
        [chalk.yellow('System Uptime'), `${Math.floor(os.uptime() / 3600)}h ${Math.floor((os.uptime() % 3600) / 60)}m ${os.uptime() % 60}s`],
        [chalk.yellow('Hostname'), os.hostname()],
        [chalk.yellow('Home Directory'), os.homedir()],
        [chalk.yellow('OS Type'), os.type()],
        [chalk.yellow('OS Release'), os.release()]
    );
    
    // CPU information
    const cpus = os.cpus();
    cpus.forEach((cpu, index) => {
        table.push([chalk.yellow(`CPU Core ${index + 1}`), `${cpu.model} @ ${cpu.speed}MHz`]);
    });
    
    // Network interfaces
    const networkInterfaces = os.networkInterfaces();
    Object.keys(networkInterfaces).forEach((iface) => {
        networkInterfaces[iface].forEach((details) => {
            if (!details.internal) {
                table.push([chalk.yellow(`Network (${iface})`), `${details.family}: ${details.address}`]);
            }
        });
    });
    
    // Output the table
    console.log(chalk.magenta.bold('\nSystem Information:\n'));
    console.log(table.toString());
}
module.exports = { apiErrorLogsSendTelegram , processorErrorLogsSendTelegram , serverLogs}