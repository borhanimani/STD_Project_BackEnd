const { pool } = require('./handler.js')

async function getPgVersion() {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT version()');
        console.log(result);
    } finally {
        client.release();
    }
}

module.exports = {getPgVersion}