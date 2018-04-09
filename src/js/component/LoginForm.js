import React,{Component} from 'react';
import { Form, Icon, Input, Button } from 'antd';
import fetch from 'isomorphic-fetch';
const FormItem = Form.Item;
import "../../style/login.scss";
import {CONFIG} from "../constants/conifg";

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
            const {server} = CONFIG;
            const url = server + "/login"
            if (!err) {
                fetch(url,{
                    method:'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(values),
                    mode: 'cors'
                }).then((res) => res.json())
                    .then((data) =>{
                        if(this.state.isLogin){
                            if(data.status){
                                sessionStorage.setItem('__token__', data.token)
                                sessionStorage.setItem('__username__', data.userName)
                                window.location='/blog/'+values.userName;
                            }else{
                                alert(data.msg);
                            }
                        }else{
                            alert(data.msg);
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
                    {getFieldDecorator('UserName', {
                        rules: [{ required: true, message: 'Please input your UserName!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
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
