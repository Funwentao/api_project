import axios from 'axios';


export default function(Router){

    const router = new Router();

    router.get('/test',async(ctx,next)=>{
        ctx.body = {msg:'hello word!'};
    });

    router.get('/user/openid',async(ctx,next)=>{

        const {code} = ctx.request.query;
	const APPID = 'wxb30dd0a53c1099e0';
	const SECRET = '2de8a8d95618e361735fbfd179b06827';

        const URL = 'https://api.weixin.qq.com/sns/jscode2session?appid=' +
            APPID + '&secret=' + SECRET + '&js_code=' + code + '&grant_type=authorization_code';

        const {data} = await axios({
            method: 'GET',
            url:URL
        });
	
	
	ctx.body = { ...data };

    });

    return router.routes();
}
