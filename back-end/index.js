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
const { addUser, loginUser, uploadImage, addMenuItem } = require('./core/DataBase/connection.js')

app.get('/menu', (request, response) => {

});

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
    try {
        const a = await uploadImage(image, information.info)
        const b = await addMenuItem(JSON.parse(information.info));
        response.sendStatus(200)
    } catch (error) {
        console.log('ERRRROOOORRRRR', error);
        response.sendStatus(400);
    }

});

app.post('/edit/upload/text', async (request, response) => {
    const info = request.body
    console.log(info);
    try {
        const result = await addMenuItem(info)
        response.send(result).status(200)
    } catch (error) {
        response.send(400)
    }
});




app.listen(port, () => console.log(`My App Listening at http://localhost:${port}`)); 
