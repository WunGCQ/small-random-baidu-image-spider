// var Koa = require('koa');
import Koa from 'koa';
let app = new Koa();

app.use( function*(ctx){
  ctx.body = 'Hello World';
});

app.listen(3000);
