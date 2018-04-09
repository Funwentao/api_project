import React,{Component} from 'react';
import {Icon} from  'antd';
import '../../style/myheader.scss';


class MyHeader extends Component{
    constructor(){
        super();
    }
    render(){
        return(
            <header>
                <h1>Student Sign In Management System</h1>
                <div className="icon-container">
                    <Icon type="user" style={{color:'#fff',fontSize:'20px'}}/>
                </div>
            </header>
        )
    }
}

export default MyHeader;