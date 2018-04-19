import React,{Component} from 'react';
import {Button,message} from 'antd';
import QRcode from 'qrcode.react';
import ReactDOM from 'react-dom';
import '../../style/qr.scss';
import urlQuery from '../tool/urlQuery';

const url = location.href;
const {time,week,courseId,signId} = urlQuery(url);

class ScanQr extends Component{
    constructor(){
        super();
        this.state = {
            code:123,
            opacity:1,
            opacity2:0
        };
        this.endSign = this.endSign.bind(this);
    }
    endSign(){
        /*
        const url = `${server}/course/${courseId}/sign/${signId}/link`;
        const obj = {
            start:0
        };
        fetch(url,{
            method:'post',
            mode: 'cors',
            credentials:'include',
            body:JSON.stringify(obj)
        }).then(res=>{
            return res.json()
        }).then(data=>{
            if(data.status==='success'){

            }else{
                message.error(data.msg);
            }
        });
        */
        let {opacity,opacity2} = this.state;
        const clearId = setInterval(()=>{
            if(opacity>0){
                opacity -= 0.05;
                opacity2 += 0.05;
                console.log(opacity);
                this.setState({
                    opacity,
                    opacity2
                });
            }else{
                clearInterval(clearId);
            }
        },50);
    }
    componentDidMount(){

    }
    render(){
        const URL = 'https://api.funwt.top/sign?code=' + this.state.code;
        return(
            <div  className="container">
                <div className="qr-content" style={{opacity:this.state.opacity}}>
                    <QRcode value={URL}  size={600}/>
                    <div className="btn-content">
                        <Button type='primary' size="large" onClick={this.endSign}>结束签到</Button>
                    </div>
                </div>
                <div className="bg-tips" style={{opacity:this.state.opacity2}}>已结束</div>
            </div>
        )
    }
}

ReactDOM.render(<ScanQr/>,document.getElementById("app"));