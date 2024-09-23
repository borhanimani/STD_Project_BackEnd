const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'files/' })
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (_, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,PATCH,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});
const port = 3000;
const { addUser, loginUser, uploadImage, addMenuItem, addMenuCategory, getCategories, getItems, getItemImageId, deleteItem, deleteImage, deleteCategoryItems, deleteCategory, getItemById, updateItem, getItemList, addOrder, getComments, addComment } = require('./core/DataBase/connection.js')

app.post('/signup', async (request, response) => {
    const info = request.body
    // console.log(d);
    try {
        const result = await addUser(info)
        response.send(result).status(200)
    } catch (error) {
        response.send(400)
    }
});

app.get('/signin', async (request, response) => {
    const u = request.query.username;
    const p = request.query.password;
    const info = { "username": u, "password": p }
    // console.log(d);
    try {
        const result = await loginUser(info)
        response.send(result).status(200)
    } catch (error) {
        response.send(400)
    }
});

app.post('/edit/upload', upload.any(), async (request, response) => {
    // console.log(request.body);
    const image = request.files[0];
    const information = request.body;
    console.log(information);
    try {
        console.log('sendinnnng...');
        const { secure_url, public_id } = await uploadImage(image, information.info)
        console.log('img iddd: '+public_id);
        const b = await addMenuItem(JSON.parse(information.info), secure_url, public_id);
        response.sendStatus(200)
    } catch (error) {
        console.log(error);
        response.sendStatus(400);
    }

});

app.post('/edit/upload/category', async (request, response) => {
    const info = request.body
    // console.log(info);
    try {
        const result = await addMenuCategory(info)
        response.send(result).status(200)
    } catch (error) {
        response.send(400)
    }
});

app.get('/edit/category', async (request, response) => {
    try {
        const result = await getCategories();
        // console.log(result); 
        response.send(result)
    } catch (error) {
        response.send(400)
    }
});

app.get('/edit/items/id/:id', async (request, response) => {
    const categoryId = Number.parseInt(request.params.id);
    // console.log(categoryId);
    try {
        const result = await getItems(categoryId);
        // console.log(result);
        response.send(result)
    } catch (error) {
        response.send(400)
    }
});

app.delete('/edit/delete/item/:id', async (request, response) => {
    const itemId = request.params.id;
    // console.log('IIDD', itemId);
    try {
        const photoIdR = await getItemImageId(itemId);
        await deleteImage(photoIdR[0].photoid)
        await deleteItem(itemId)
        response.sendStatus(200)
    } catch (error) {
        response.send(400)
    }
});

app.delete('/edit/delete/category/:id', async (request, response) => {
    const categoryId = request.params.id;
    try {
        await deleteCategoryItems(categoryId)
        await deleteCategory(categoryId);
        response.sendStatus(200)
    } catch (error) {
        response.send(400)
    }
});

app.get('/edit/update/:id', async (request, response) => {
    const itemId = request.params.id;
    try {
        const item = await getItemById(itemId)
        // console.log(item);
        response.send(item)
    } catch (error) {
        response.send(400)
    }
});

app.post('/edit/update/item/:id', async (request, response) => {
    const id = request.params.id;
    const item = request.body;
    try {
        await updateItem(item, id)
        response.sendStatus(200)
    } catch (error) {
        response.send(400)
    }
})

app.get('/menu/:id', async (request, response) => {
    const categoryId = request.params.id;
    try {
        const list = await getItemList(categoryId);
        console.log(list);
        response.send(list);
    } catch (error) {
        response.send(400)
    }
})

app.post('/order/buy', async (request, response) => {
    const info = request.body;
    try {
        await addOrder(info)
        response.sendStatus(200)
    } catch (error) {
        response.send(400)
    }
})

app.get('/comment', async (request, response) => {
    try {
        const list = await getComments();
        console.log(list);
        response.send(list);
    } catch (error) {
        response.send(400)
    }
})

app.post('/comment/add', async (request, response) => {
    console.log('ddddd');
    const info = request.body;
    try {
        await addComment(info)
        response.sendStatus(200)
    } catch (error) {
        response.send(400)
    }
})



app.listen(port, () => console.log(`My App Listening at http://localhost:${port}`)); 
