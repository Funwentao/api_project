import React,{Component} from 'react';
import {Button} from 'antd';
import QRcode from 'qrcode.react';
import ReactDOM from 'react-dom';
import '../../style/qr.scss';
import urlQuery from '../tool/urlQuery';

class ScanQr extends Component{
    constructor(){
        super();
        this.state = {
            code:123
        };
        this.changeCode = this.changeCode.bind(this);
    }
    changeCode(){
        let code = Math.random() * 1000;
        this.setState({
            code
        });
    }
    componentDidMount(){
        const url = location.href;
        const {time,week,courseId} = urlQuery(url);
        console.log(time,week,courseId);
    }
    render(){
        const URL = 'https://api.funwt.top/sign?code=' + this.state.code;
        return(
            <div className="qr-content">
                <QRcode value={URL}  size={600}/>
                <div className="btn-content">
                    <Button type='primary' size="large" onClick={this.changeCode}>更换二维码</Button>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<ScanQr/>,document.getElementById("app"));