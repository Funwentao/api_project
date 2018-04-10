import React,{Component} from 'react';
import {Form,Button,Input,Icon} from 'antd'

const FormItem = Form.Item;

class EditForm extends Component{
    constructor(){
        super()
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <Form>
                <FormItem>
                    {getFieldDecorator('oldPassword', {
                        rules: [{ required: true, message: 'Please input your UserName!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="oldPassword" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('newPassword', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="newPassword" />
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