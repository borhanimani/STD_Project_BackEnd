const { sql } = require('./handler.js')
const { cloudinary } = require('./cloudinary.js')

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

async function addMenuItem(userInfo, imgUrl, imgId) {
    console.log('insidee', userInfo);
    try {
        const result = await sql`INSERT INTO ws_food (name, detail, price, categoryId,photoLink,photoId) VALUES (${userInfo.name}, ${userInfo.detail}, ${userInfo.price},${userInfo.categoryId},${imgUrl},${imgId})`;
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
        return result
    } catch (error) {
        console.log(error);
        return error
    }
}

async function deleteImage(imageId) {
    console.log(imageId);
    try {
        const result = await cloudinary.uploader.destroy(imageId)
        return result
    } catch (error) {
        console.log(error);
        return error
    }
}

async function addMenuCategory(userInfo) {
    console.log(userInfo);
    try {
        const result = await sql`INSERT INTO ws_food_category (name) VALUES (${userInfo.category})`;
        return result
    } catch (error) {
        console.log(error);
        return error
    }
}

async function getCategories() {
    try {
        const result = await sql`SELECT * FROM ws_food_category`;
        return result
    } catch (error) {
        console.log(error);
        return error
    }
}

async function getItems(categoryId) {
    try {
        const result = await sql`SELECT * FROM ws_food WHERE categoryId=${categoryId}`;
        return result
    } catch (error) {
        console.log(error);
        return error
    }
}

async function getItemImageId(itemId) {
    try {
        const result = await sql`SELECT photoId FROM ws_food WHERE id=${itemId}`;
        return result
    } catch (error) {
        console.log(error);
        return error
    }
}

async function deleteItem(itemId) {
    try {
        const result = await sql`DELETE FROM ws_food WHERE id=${itemId}`;
        return result
    } catch (error) {
        console.log(error);
        return error
    }
}


async function deleteCategoryItems(categoryId) {
    try {
        const result = await sql`DELETE FROM ws_food WHERE categoryId=${categoryId}`;
        return result
    } catch (error) {
        console.log(error);
        return error
    }
}

async function deleteCategory(categoryId) {
    try {
        const result = await sql`DELETE FROM ws_food_category WHERE id=${categoryId}`;
        return result
    } catch (error) {
        console.log(error);
        return error
    }
}

async function getItemById(itemId) {
    try {
        const result = await sql`SELECT * FROM ws_food WHERE id=${itemId}`;
        return result
    } catch (error) {
        console.log(error);
        return error
    }
}

async function updateItem(item, id) {
    try {
        const result = await sql`UPDATE ws_food SET name=${item.name}, detail=${item.detail},price=${item.price},categoryid=${item.categoryId}  WHERE id=${id}`;
        return result
    } catch (error) {
        console.log(error);
        return error
    }
}

async function getItemList(id) {
    try {
        const result = await sql`Select * From ws_food WHERE categoryid=${id} `;
        return result
    } catch (error) {
        console.log(error);
        return error
    }
}

module.exports = { addUser, loginUser, uploadImage, addMenuItem, addMenuCategory, getCategories, getItems, getItemImageId, deleteItem, deleteImage, deleteCategoryItems, deleteCategory, getItemById, updateItem, getItemList }