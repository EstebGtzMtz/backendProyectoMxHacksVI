const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const app = express();

app.post('/login', (req, res) => {
    const body = req.body;

    User.findOne({ email: body.email }, (err, dbUser) => {
        if (err) { return res.status(500).json({ ok: false, err }) }

        if (!dbUser) { return res.status(400).json({ ok: false, err: { message: 'Email or password incorrect' } }) }

        if (!bcrypt.compareSync(body.password, dbUser.password)) { return res.status(400).json({ ok: false, err: { message: 'email or Password incorrect' } }) }

        let token = jwt.sign({ dbUser }, process.env.SEED, { expiresIn: process.env.TOKEN_EXPIRES });

        res.json({ ok: true, dbUser, token });
    });
});

module.exports = app;