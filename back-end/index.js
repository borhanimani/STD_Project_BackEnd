const express = require('express');
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
const { addUser, loginUser } = require('./core/DataBase/connection.js')

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






app.listen(port, () => console.log(`My App Listening at http://localhost:${port}`)); 
