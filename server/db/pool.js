//mport { Pool } from 'pg';

// import dotenv from 'dotenv';

// dotenv.config();

const pg = require('pg');

const databaseConfig = {
    user: 'postgres',
    host: 'DBPM',
    database: 'test2',//'AgriculturalTown2',
    password: 'abg@@123',
    port: 5432,
};
const pool = new pg.Pool(databaseConfig);

module.exports = pool;