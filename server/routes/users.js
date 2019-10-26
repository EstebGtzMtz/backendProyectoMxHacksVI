const express = require('express');
const app = express();

app.get('/user', (req, res) => {
    res.json('que pedo');
});

app.post('/user', (req, res) => {
    const body = req.body;
    res.json({
        body
    });
});

app.put('/user/:id', (req, res) => {
    const id = req.param.id;

    res.json('put works');
});

module.exports = app;