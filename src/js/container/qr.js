import React,{Component} from 'react';
import {Button,message} from 'antd';
import QRcode from 'qrcode.react';
import ReactDOM from 'react-dom';
import '../../style/qr.scss';
import urlQuery from '../tool/urlQuery';
import {CONFIG} from "../constants/conifg"

const url = location.href;
const {time,week,courseId,signId} = urlQuery(url);
const {server} = CONFIG;
let ws = null;
let websocketLink = '';

class ScanQr extends Component{
    constructor(){
        super();
        this.state = {
            httpLink:'',
            opacity:1,
            opacity2:0,
            fontSize:0,
            show:false
        };
        this.endSign = this.endSign.bind(this);
        this.webSocketConnect = this.webSocketConnect.bind(this);
    }
    endSign(){
        const wsObj ={time,week,courseId,signId,start:0};
        ws.send(JSON.stringify(wsObj));
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
                let {opacity,opacity2,fontSize} = this.state;
                const clearId = setInterval(()=>{
                    if(opacity>0){
                        opacity -= 0.05;
                        opacity2 += 0.05;
                        fontSize += 10;
                        console.log(opacity);
                        this.setState({
                            opacity,
                            opacity2,
                            fontSize
                        });
                    }else{
                        this.setState({
                            show:false
                        });
                        clearInterval(clearId);
                    }
                },50);
            }else{
                message.error(data.msg);
            }
        });
    }
    webSocketConnect(){
        ws = new WebSocket(websocketLink);
        const obj ={time,week,courseId,signId,start:1};
        ws.onopen = ()=>{
            console.log("连接建立...");
            ws.send(JSON.stringify(obj));
        };
        ws.onmessage = (evt)=>{
            const {data} = evt;
            const obj = JSON.parse(data);
            this.setState({
                httpLink:obj.httpLink
            })
        };
        ws.error = (err)=>{
            console.log(err);
        };
        ws.onclose = ()=>{
            console.log("连接已关闭...");
        }
    }
    componentDidMount(){
        const url = `${server}/course/${courseId}/sign/${signId}/link`;
        const obj = {
            start:1
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
                this.setState({
                    show:true
                });
                websocketLink = data.websocketLink;
                this.webSocketConnect();
            }else{
                this.setState({
                    show:false
                });
                let {opacity2,fontSize} = this.state;
                const clearId = setInterval(()=>{
                    if(opacity2<1){
                        opacity2 += 0.05;
                        fontSize += 10;
                        this.setState({
                            opacity2,
                            fontSize
                        });
                    }else{
                        clearInterval(clearId);
                    }
                },50);
            }
        });
    }
    componentWillMount(){
        ws = null;
    }
    render(){
        const {opacity,opacity2,fontSize,show} = this.state;
        return(
            <div  className="container">
                {
                    show&&<div className="qr-content" style={{opacity}}>
                        <QRcode value={this.state.httpLink}  size={600}/>
                        <div className="btn-content">
                            <Button type='primary' size="large" onClick={this.endSign}>结束签到</Button>
                        </div>
                    </div>
                }
                <div className="bg-tips" style={{opacity:opacity2,fontSize:fontSize}}>已结束</div>
            </div>
        )
    }
}

ReactDOM.render(<ScanQr/>,document.getElementById("app"));