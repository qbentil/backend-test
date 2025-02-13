'use strict';

import dotenv from 'dotenv';
import ms from 'ms';

dotenv.config();

const config = {
    app: {
        env: process.env.NODE_ENV,
        port: process.env.PORT || 4000,
        name: process.env.APP_NAME || "",
        secret: process.env.APP_SECRET || ""
    },
    auth: {
        secret: process.env.AUTH_SECRET,
        token_expiry: ms(parseInt(process.env.AUTH_TOKEN_EXPIRY || "", 10)),
        code_expiry: ms(parseInt(process.env.AUTH_CODE_EXPIRY || "", 10)),
    },
    mongo: {
        uri: process.env.MONGO_URI
    },

    mail: {
        key:
            process.env.MAIL_KEY || "",
        domain: process.env.MAIL_DOMAIN || '',
        timeout: process.env.MAIL_TIMEOUT || '1000',
        retries: process.env.MAIL_RETRIES || '5',
        disable: process.env.DISABLE_EMAILS || false
    },
};

export default config;
