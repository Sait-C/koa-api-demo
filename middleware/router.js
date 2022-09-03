const KoaRouter = require('koa-router');
const router = new KoaRouter();

//if there is a GET request to the '/' route, then give second parameter as a response to user
router.get('/', async ctx=>(ctx.body = 'Welcome to the contacts API!')); //response is a string

module.exports = router;