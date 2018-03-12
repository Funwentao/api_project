import Koa from 'koa';
import Router from 'koa-router';
import parser from 'koa-bodyparser';
import body from 'koa-body';
import cors from 'koa2-cors';
import mongoConnection from './db/connection';

import api from './routes/api';

const app = new Koa();


app
    .use(cors())
    .use(body({ multipart: true }))
    .use(parser({ multipart: true }))
    .use(api(Router));

(async()=>{
    try{
        await mongoConnection();
}catch (e){
    console.error('ERROR:',e);
}

app.listen(4000,'0.0.0.0',()=>{
    console.log('server running on port 4000');
})

})();

