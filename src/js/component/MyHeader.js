import React,{Component} from 'react';
import {Icon,Dropdown,Menu} from  'antd';
import '../../style/myheader.scss';


class MyHeader extends Component{
    constructor(){
        super();
    }
    render(){
        const menu = (
            <Menu>
                <Menu.Item key="1">修改个人信息</Menu.Item>
                <Menu.Item key="2">退出登录</Menu.Item>
            </Menu>
        );
        return(
            <header>
                <h1>Student Sign In Management System</h1>
                <div className="icon-container">
                    <Dropdown overlay={menu}>
                        <Icon type="user" style={{color:'#fff',fontSize:'20px'}}/>
                    </Dropdown>
                </div>
            </header>
        )
    }
}

export default MyHeader;