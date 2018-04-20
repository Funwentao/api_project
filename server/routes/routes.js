export default function (Router) {
    const router = new Router();

    /**
     * 扫码页面
     */
    router.get('/qr',async(ctx,next) => {
        await ctx.render('qr');
    });

    /**
     * 登录注册
     */
    router.get('/',async(ctx,next) => {
        await ctx.render('login');
    });

    /**
     * 首页
     */
    router.get('/home',async(ctx,next)=>{
        await ctx.render('home');
    });

    /**
     * 点名
     */
    router.get('/call',async(ctx,next)=>{
        await ctx.render('call');
    });

    return router.routes();
}