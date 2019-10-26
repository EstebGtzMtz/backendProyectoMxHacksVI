const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();
const User = require('../models/user');

app.get('/user/:id', (req, res) => {
    const id = req.params.id;

    User.findById(id, 'name lastName age email img phoneNumber')
        .exec((err, userLogin) => {
            if (err) { return res.status(400).json({ ok: false, err }) }

            res.json({ ok: true, userLogin });
        });
});

app.post('/user', (req, res) => {
    const body = req.body;

    const user = new User({
        name: body.name,
        lastName: body.lastName,
        age: body.age,
        phoneNumber: body.phoneNumber,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    user.save((err, userSuccesfullySavedInDB) => {
        if (err) { return res.status(400).json({ ok: false, err }) }

        res.json({ ok: true, userSuccesfullySavedInDB });
    });
});

app.put('/user/:id', (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['name', 'lastName', 'age', 'phoneNumber', 'email', 'img', 'havePets']);

    User.findOneAndUpdate(id, body, { new: true, runValidators: true }, (err, userSuccesfullyUpdatedInDB) => {
        if (err) { return res.status(400).json({ ok: false, err }) }

        res.json({ ok: true, userSuccesfullyUpdatedInDB })
    });

});

app.delete('/user/:id', (req, res) => {
    const id = req.params.id;
    const deletedUser = { isActive: false };

    User.findOneAndUpdate(id, deletedUser, { new: true, runValidators: true }, (err, logicDeletedUser) => {
        if (err) { return es.status(400).json({ ok: false, err }) }

        if (!logicDeletedUser) { return res.status(400).json({ ok: false, err }) }

        res.json({ ok: true, logicDeletedUser })
    });

});

module.exports = app;