
import * as Koa from 'koa';
import * as Router from 'koa-router';
import { getConfig } from './config/configService';

const app = new Koa();
const router = new Router();
const port = getConfig('PORT')

router.get('/', async (ctx) => {
    ctx.body = 'Hello World!';
});

app.use(router.routes());

app.listen(port);

console.log(`Server running on port ${port}`);