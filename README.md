# simple-koa-log
simple koa log

install
----
```javascript
npm install simple-koa-log
```


use
---
```javascript
const Koa = require('koa')
const KoaRouter = require('koa-router')
const log = require('simple-koa-log')
var app = new Koa();
var router = new KoaRouter();

router.get('/error',(ctx,next)=>{
    throw new Error('err111')
    log.info('on error')
    ctx.body = 'test'
    next()
})
router.get('/',(ctx,next)=>{
    log.info('on root')
    ctx.body = 'hello world' ;
    next();
})
app.onerror = (err)=>{
    for(var key in err){
        console.log(key,err[key]);
    }
    log.error(err.message);
}
app.use(router.routes())
    .use(router.allowedMethods())
    .use(ctx=>{
        log.access(ctx.url);
    })
app.listen(8080)
```
default log path
----
YOU_PROJECT_ROOT/logs/access-2019-05-06.log<br>
YOU_PROJECT_ROOT/logs/error-2019-05-06.log<br>
YOU_PROJECT_ROOT/logs/info-2019-05-06.log<br>


config
---
```javascript
//subPaht & fileName support format "YYYY-MM-DD hh:mm:ss"
log.config({
    path: './path',
    subPath: 'YYYY-MM',
    fileName: '-DD-log.txt'
})
```
log path
---
YOU_PROJECT_ROOT/path/2019-05/access-06-log.txt<br>
YOU_PROJECT_ROOT/logs/2019-05/error-06-log.txt<br>
YOU_PROJECT_ROOT/logs/2019-05/info-06-log.txt<br>
