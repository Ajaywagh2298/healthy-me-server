const dotenv = require('dotenv')
dotenv.config();

const defaultServerConfig = {
    SERVER_HOST: '',
    PORTAL_URL: '',
    APP_URL: '',
};

const defaultDbConfig = {
    dialect: 'mysql',
    host: '',
};

const envConfig = {
    serverConfig: {
        production: {
            SERVER_HOST: '',
            PORTAL_URL: '',
            APP_URL: '',
            host_PORT: 8091
        },
        demo: {
            SERVER_HOST: '',
            PORTAL_URL: '',
            APP_URL: '',
            host_PORT: 8092
        },
        uat: {
            SERVER_HOST: '',
            PORTAL_URL: '',
            APP_URL: '',
            host_PORT: 8093,
        },
        development: {
            SERVER_HOST: '',
            PORTAL_URL: '',
            APP_URL: '',
            host_PORT: 8090,
        },
    },
    dbConfig: {
        production: {
            ...defaultDbConfig,
            username: process.env.PROD_DB_USERNAME || '',
            password: process.env.PROD_DB_PASSWORD || '',
            database: process.env.PROD_DB_NAME || 'healthyme_pro',
        },
        demo: {
            ...defaultDbConfig,
            username: process.env.DEMO_DB_USERNAME || '',
            password: process.env.DEMO_DB_PASSWORD || '',
            database: process.env.DEMO_DB_NAME || 'healthyme_demo',
        },
        uat: {
            ...defaultDbConfig,
            username: process.env.UAT_DB_USERNAME || '',
            password: process.env.UAT_DB_PASSWORD || '',
            database: process.env.UAT_DB_NAME || 'healthyme_uat',
        },
        development: {
            ...defaultDbConfig,
            username: process.env.DEV_DB_USERNAME || 'root',
            password: process.env.DEV_DB_PASSWORD || 'root',
            database: process.env.DEV_DB_NAME || 'healthyme',
        },
    },
    defaultOrg: {
        production: {
            uid: 'ce9ab45d-550e-467b-a590-b88dc200d7b9',
            orgName: 'Healthy Me',
            username: process.env.PROD_ORG_USERNAME || 'pro-user',
            password: process.env.PROD_ORG_PASSWORD || '123456',
            email: process.env.PROD_ORG_EMAIL || 'admin.pro@gmail.com',
            phone: '8605473682',
        },
        demo: {
            uid: '09d942f9-862c-4a7c-8c1a-f6c5053a1eec',
            orgName: 'Healthy Me Demo',
            username: process.env.DEMO_ORG_USERNAME || 'demo-user',
            password: process.env.DEMO_ORG_PASSWORD || '123456',
            email: process.env.DEMO_ORG_EMAIL || 'admin.demo@gmail.com',
            phone: '8605473682',
        },
        uat: {
            uid: 'd527bb21-7e49-45d4-ac7b-4cff70dddacf',
            orgName: 'Healthy Me UAT',
            username: process.env.UAT_ORG_USERNAME || 'pro-uat',
            password: process.env.UAT_ORG_PASSWORD || '123456',
            email: process.env.UAT_ORG_EMAIL || 'admin.uat@gmail.com',
            phone: '8605473682',
        },
        development: {
            uid: 'fdbf8820-2ee8-46bb-92f4-d7f0d3845df3',
            orgName: 'Healthy Me Dev',
            username: process.env.DEV_ORG_USERNAME || 'pro-dev',
            password: process.env.DEV_ORG_PASSWORD || '123456',
            email: process.env.DEV_ORG_EMAIL || 'admin.dev@gmail.com',
            phone: '8605473682',
        },
    },
    storeConfig: {
        // Add store-specific configurations here, if needed in future
    },
    serviceConfig: {
        production: {
            TELEGRAM_API_URL : `https://api.telegram.org/bot7670966901:AAHLBCcLuTgL1b0gyZ2oG3-4B_1Dz9MwWo4/sendMessage`,
            CHANNEL_ID : '-1002313547539',
            SECRET_KEY: 'healpro',
        },
        demo: {
            TELEGRAM_API_URL : `https://api.telegram.org/bot7670966901:AAHLBCcLuTgL1b0gyZ2oG3-4B_1Dz9MwWo4/sendMessage`,
            CHANNEL_ID : '-1002313547539',
            SECRET_KEY: 'healdemo',
        },
        uat: {
            TELEGRAM_API_URL : `https://api.telegram.org/bot7670966901:AAHLBCcLuTgL1b0gyZ2oG3-4B_1Dz9MwWo4/sendMessage`,
            CHANNEL_ID : '-1002313547539',
            SECRET_KEY: 'healuat',
        },
        development: {
            TELEGRAM_API_URL : `https://api.telegram.org/bot7670966901:AAHLBCcLuTgL1b0gyZ2oG3-4B_1Dz9MwWo4/sendMessage`,
            CHANNEL_ID : '-1002313547539',
            SECRET_KEY: 'healdev',
        },
    },
};

module.exports = envConfig;
