export default function (Router) {
    const router = new Router();

    /**
     * 扫码页面
     */
    router.get('/qr',async(ctx,next) => {
        await ctx.render('qr');
    });


    return router.routes();
}