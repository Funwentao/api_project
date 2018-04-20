import React,{Component} from 'react';
import {Icon,Dropdown,Menu,message} from  'antd';
import fetch from 'isomorphic-fetch';
import {CONFIG} from "../constants/conifg";
import '../../style/myheader.scss';
const {server} = CONFIG;



export default function MyHeader(props){
    function clickHandler(e){
        if(e.key==='1'){
            props.showModal();
        }else{
            const url = server + '/logout';
            fetch(url,{
                method:'get',
                mode: 'cors',
                credentials:'include'
            }).then(res=>{
                return res.json();
            }).then(data=>{
               if(data.status==='success'){
                   localStorage.removeItem("username");
                   location.href = 'login.html'
               } else{
                   message.error(data.msg);
               }
            });
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