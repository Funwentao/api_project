import React,{Component} from 'react';
import {Icon,Dropdown,Menu} from  'antd';
import '../../style/myheader.scss';


export default function MyHeader(props){
    function clickHandler(e){
        if(e.key==='1'){
            props.showModal();
        }else{
            location.href = 'login.html'
        }
    }
    const menu = (
        <Menu onClick={clickHandler}>
            <Menu.Item key="1">修改密码</Menu.Item>
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