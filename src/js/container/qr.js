import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import QRcode from 'qrcode.react';

class Qr extends Component{
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
            <div>
                <QRcode value={URL}  />
                <button onClick={this.changeCode}>更换二维码</button>
            </div>
        )
    }
}

ReactDOM.render(<Qr/>,document.getElementById("app"));