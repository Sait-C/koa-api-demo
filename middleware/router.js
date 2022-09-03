const KoaRouter = require('koa-router');
const router = new KoaRouter();

const contactController = require('../controllers/ContactController');

//if there is a GET request to the '/' route, then give second parameter as a response to user
router
    .get('/', async ctx=>(ctx.body = 'Welcome to the contacts API!')) //response is a string
    .get('/contact', contactController.index)
    .post('/contact', contactController.store);

module.exports = router;
