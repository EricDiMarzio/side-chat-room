import dotenv from 'dotenv';

dotenv.config();


const config = {
    port: (process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    mongoURI: process.env.MONGODB_URI || 'No URI provided',
}

export default config;