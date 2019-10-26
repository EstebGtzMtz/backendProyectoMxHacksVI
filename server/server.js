require('./config/config');
const app = require('express')();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/user', (req, res) => {
    res.json('que pedo');
});

app.post('/user', (req, res) => {
    const body = req.body;
    res.json({
        body
    });
})

app.put('/user/:id', (req, res) => {
    const id = req.param.id;

    res.json('put works');
})

app.listen(process.env.PORT, () => {
    console.log('escuchando el puerto: ', process.env.PORT);
});