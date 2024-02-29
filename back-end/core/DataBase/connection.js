const { sql } = require('./handler.js')
const { cloudinary } = require('./cloudinary.js')

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

async function addMenuItem(userInfo) {
    console.log(userInfo);
    try {
        const result = await sql`INSERT INTO ws_food (name, detail, price, categoryId, photoId) VALUES (${userInfo.name}, ${userInfo.detail}, ${userInfo.price}, 1, ${userInfo.imageName})`;
        return result
    } catch (error) {
        console.log(error);
        return error
        // console.log('error', error);
    }
}

async function uploadImage(image, info) {
    try {
        const result = await cloudinary.uploader.upload(image.path,
            { public_id: info.imageName });
        console.log(result);
    } catch (error) {
        console.log(error);
        return error
    }
}



module.exports = { addUser, loginUser, uploadImage, addMenuItem }