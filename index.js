const koa = require('koa');
const router = require('./middleware/router');
const logger = require('koa-logger');
const bodyParser = require('koa-body');
const validator = require('./middleware/validator');
const app = new koa();


//logger
app.use(logger());


//body parser koa-body
app.use(bodyParser());

const mongoose = require('mongoose');
/*
The connect method takes the MongoDB connection URL 
as its first argument, then an object with connection options 
as its second. 
The only option that we specify is for mongoose 
to use the new URL parser for the mongo connection string.
*/
mongoose.connect(
    'mongodb://localhost:27017/koa-contact',
    { useNewUrlParser: true }
);

const db = mongoose.connection;
//listener to alert us when there's an error connecting to the DB
db.on('error', error => {
    throw new Error(`error connection to db: ${error}`);
});
db.once('open', () => console.log('database connected'));

//joi validator
app.use(validator());

//router
app.use(router.routes());
app.use(router.allowedMethods());

//The server either runs on a specified port with the PORT environmental variable, or on the default 3000 port.
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});