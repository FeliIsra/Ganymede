import * as Koa from 'koa';
import * as koaBody from 'koa-body'
import { getConfig } from './config/configService';
import initDB from './db/database';
import router from './routes';

initDB()

const app = new Koa();
const port = getConfig('PORT')

// logger
app.use(async (ctx, next) => {
    // Log the request to the console
    console.log('Url:', ctx.url);
    // Pass the request to the next middleware function
    await next();
});

app.use(koaBody());
app.use(router.routes());

app.listen(port);

console.log(`Server running on port ${port}`);