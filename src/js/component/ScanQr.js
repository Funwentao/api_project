import React,{Component} from 'react';
import {Button} from 'antd';
import QRcode from 'qrcode.react';
import '../../style/qr.scss';

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
    render(){
        const URL = 'https://api.funwt.top/sign?code=' + this.state.code;
        return(
            <div className="qr-content">
                <QRcode value={URL}  size={300}/>
                <div className="btn-content">
                    <Button type='primary' onClick={this.changeCode}>更换二维码</Button>
                </div>
            </div>
        )
    }
}

export default ScanQr;