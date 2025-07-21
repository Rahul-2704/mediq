// db.js
import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();
const { Pool } = pkg;

console.log('db url',process.env.DATABASE_URL)

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
   ssl: {
        rejectUnauthorized: false
    }
});

pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL');
});

export const query = (text, params) => pool.query(text, params);
export { pool };
