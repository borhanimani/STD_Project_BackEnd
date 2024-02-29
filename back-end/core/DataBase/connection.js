const { sql } = require('./handler.js')

async function getPgVersion() {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT version()');
        console.log(result);
    } finally {
        client.release();
    }
}

async function addUser(userInfo) {
    // console.log(userInfo);
    try {
        const result = await sql`INSERT INTO ws_user(firstname,lastname,phoneNumber,username,password,isAdmin,commented) VALUES (${userInfo.firstname},${userInfo.lastname},${userInfo.phoneNumber},${userInfo.username},${userInfo.password},false,false)`;
        return result
    } catch (error) {
        return error
        // console.log('error', error);
    }

}

async function loginUser(userInfo) {
    console.log(userInfo);
    try {
        const result = await sql`SELECT firstname, isAdmin, commented FROM ws_user WHERE username = ${userInfo.username} AND password = ${userInfo.password}`
        return result
    } catch (error) {
        return error
        // console.log('error', error);
    }
}
module.exports = { addUser, loginUser }