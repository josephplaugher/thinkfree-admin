const { Pool } = require('pg')

const Conn = new Pool({
    user: process.env.DB_USERNAME,
    host: process.env.HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})
Conn.connect()
.catch(e => console.error(e.stack));

module.exports = { Conn };