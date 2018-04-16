import React,{Component} from 'react';
import {Form,Button,Input,Icon,message} from 'antd'
import fetch from 'isomorphic-fetch';
import {CONFIG} from "../constants/conifg";
const {server} = CONFIG;


const FormItem = Form.Item;

class EditForm extends Component{
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err,values)=>{
            if(!err){
                const url = server + '/user/password';
                fetch(url,{
                    method:'put',
                    mode:'cors',
                    credentials:'include',
                    body:JSON.stringify(values)
                }).then(res=>{
                    return res.json();
                }).then(data=>{
                    if(data.status==='success'){
                        message.success(data.msg);
                        this.props.showModal();
                    }else{
                        message.error(data.msg);
                    }
                });
            }
        })
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <Form onSubmit={this.handleSubmit}>
                <FormItem>
                    {getFieldDecorator('oldPassword', {
                        rules: [{ required: true, message: 'Please input your UserName!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                               type="password"
                               placeholder="oldPassword" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('newPassword', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                               type="password"
                               placeholder="newPassword" />
                    )}
                </FormItem>
                <FormItem style={{textAlign:'center'}}>
                    <Button type="primary" htmlType="submit" style={{width:'100%'}}>
                        修改
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

const EditModal = Form.create()(EditForm);
export default EditModal;