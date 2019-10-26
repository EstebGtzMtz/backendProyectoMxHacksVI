//Port to use
process.env.PORT = process.env.PORT || 3000;

//Envorinment
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Database
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/sabuesoDB';
} else {
    urlDB = 'mongodb://sabuesoUser:a123456@ds139768.mlab.com:39768/mxhacks';
}

process.env.URLDB = urlDB;