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
const {getPgVersion} = require('./core/DataBase/index.js')

getPgVersion;

app.get('/menu', (request, response) => {

});

app.get('/menu', (request, response) => {

});


app.listen(port, () => console.log(`My App Listening at http://localhost:${port}`)); 
