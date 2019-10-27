const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const { tokenVerify } = require('../middleware/autentication');
const Pets = require('../models/pets');


app.post('/pets', tokenVerify, (req, res) => {
    let getInfoUser = jwt.decode(req.get('token'));
    console.log(getInfoUser);
    let getUserId = getInfoUser.dbUser._id;

    const body = req.body;

    const pet = new Pets({
        name: body.name,
        age: body.age,
        size: body.size,
        lost: body.lost,
        toAdoption: body.toAdoption,
        isActive: body.isActive,
        description: body.description,
        user: getUserId
    });

    pet.save((err, petPosted) => {
        if (err) { return res.status(500).json({ ok: false, err }) }

        res.status(201).json({ ok: true, petPosted });
    });
});

app.get('/pets/search/:id', tokenVerify, (req, res) => {
    const id = req.params.id;

    Pets.findById(id, 'name age')
        .exec((err, getUserPets) => {
            if (err) { return res.status(500).json({ ok: false, err }) }

            res.json({ ok: true, getUserPets });
        });
});


module.exports = app;