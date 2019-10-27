const app = require('express')();

app.use(require('./users'));
app.use(require('./login'));
app.use(require('./pets'));

module.exports = app;