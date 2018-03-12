export default function(Router){

    const router = new Router();

    router.get('/test',async(ctx,next)=>{
        ctx.body = {msg:'hello word!'};
    });

    return router.routes();
}