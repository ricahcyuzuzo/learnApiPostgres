require('dotenv').config()
const { Pool } = require('pg');

// const isProduction = process.env.NODE_ENV === 'production' || 'test';

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
    connectionString: process.env.NODE_ENV === 'production' || 'development' ? process.env.DATABASE_URL : process.env.TEST_DATABASE_URL,
    ssl: isProduction
});

module.exports = { pool };