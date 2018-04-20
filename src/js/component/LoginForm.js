import React,{Component} from 'react';
import { Form, Icon, Input, Button,message} from 'antd';
import fetch from 'isomorphic-fetch';
import "../../style/login.scss";
import {CONFIG} from "../constants/conifg"
const {server,homeUrl} = CONFIG;


const FormItem = Form.Item;

class NormalLoginForm extends Component {
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
        this.state = {
            isLogin:true,
            time:10
        }
    }
    handleSubmit  (e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const url = server + "/login";
            if (!err) {
                fetch(url,{
                    method:'post',
                    body:JSON.stringify(values),
                    mode: 'cors',
                    credentials:'include'
                }).then((res) => {
                    return res.json();
                }).then((data) =>{
                    if(data.status === "success"){
                        location.href = homeUrl;
                        localStorage.setItem("username",values.username);
                    }else{
                        message.error(data.msg);
                    }
                });
            }
        });
    }
    sendEmail(){
        console.log(1);
        let temp = setInterval(()=>{
            if(this.state.time===0){
                clearInterval(temp);
                this.setState({
                    time:10
                })
            }else{
                this.setState({
                    time:this.state.time-1
                })
            }
        },1000)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const Search = Input.Search;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <h1>{this.state.isLogin?'登录':'注册'}</h1>
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your UserName!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="username" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                {
                    !this.state.isLogin && <FormItem>
                        {getFieldDecorator('Email', {
                            rules: [{ required: true, message: 'Please input your Email!' }],
                        })(
                            <Search prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Email"
                                    enterButton={this.state.time===10?'发送邮件':this.state.time+'s'}
                                    onSearch={this.state.time===10?this.sendEmail:null}
                            />
                        )}
                    </FormItem>

                }
                {
                    !this.state.isLogin && <FormItem>
                        {getFieldDecorator(' Verification Code', {
                            rules: [{ required: true, message: 'Please input your Verification Code!' }],
                        })(
                            <Input prefix={<Icon type="question-circle-o" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="Verification Code" />
                        )}
                    </FormItem>

                }
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        {this.state.isLogin?'Login':'Register'}
                    </Button>
                    Or <a href="#" onClick={()=>this.setState({isLogin:!this.state.isLogin})}>{this.state.isLogin?'register now!':'Login now!'}</a>
                </FormItem>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;
