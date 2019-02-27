const express = require('express');
const app = express();
const clientPath = "./client/index.html";
const path = require('path')
const filesRoutes = require('./api/routes/files');
const morgan = require('morgan');
global.appRoot = path.resolve(__dirname);
const bodyParser = require("body-parser");

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static('client'));
//Routes which should handle requests
app.get('/client', (req, res, next)=>{
    res.sendFile(path.join(__dirname + "/client/index.html"))
});

app.use('/files', filesRoutes);
app.use((req,res,next)=>{
    const error = new Error("Not found ");
    error.status = 404;
    next(error)
});
app.use((error, req,res, next)=>{
    res.status(error.status || 500);
    res.json({
        message: error.message
    })

})
module.exports = app;