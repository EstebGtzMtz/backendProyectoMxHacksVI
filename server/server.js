const app = require('express')();

app.get('/', (req, res) => {
    res.send('que pedo');
})

app.listen(3000, () => {
    console.log('escuchando el puerto 3000');
});