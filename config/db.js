const { Pool} =require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.ELEPHANT_SQL_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

pool.query('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY,name VARCHAR(200),email VARCHAR(100),password VARCHAR(200),isBlocked BOOLEAN DEFAULT false)')
    .then(() => {
        console.log('database connected');
    })
    .catch(err => {
        console.log(err.message)
    })

module.exports=pool;