import axios from 'axios';
import sql from '../db/config';
import bcrypt from 'bcrypt';


export default function(Router){

    const router = new Router();

    /**
     * 获取用户的openid
     */
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


    /**
     * 将用户和openid绑定
     */
    router.post('/user/login',async(ctx,next)=>{
        const {password,studentNum,openid} = ctx.request.body;
        await sql.startTransaction();
        const user = await sql.executeTransaction("select * from user where name = ?;", [studentNum]);
        if(!user.length){
            ctx.body = {
                status:"failed",
                msg:"账户名或密码错误"
            }
        }else{
            if(user[0].password === bcrypt.hashSync(password,user[0].password)){
                await sql.executeTransaction("update user set open_id = ? where name = ?;",[openid,studentNum]);
                ctx.body = {
                    status:"success",
                    msg:"绑定成功"
                }
            }else{
                ctx.body = {
                    status:"failed",
                    msg:"账户名或密码错误"
                }
            }
        }
        await sql.stopTransaction();
    });

    return router.routes();
}
