import React,{Component} from 'react';
import {Form,Input,Select} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class CourseForm extends  Component{
    constructor(){
        super();
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const array = [1,2,3,4,5,6,7,8,9,10,11,12];
        const array2 = [13,14,15,16,17,18,19,20];
        const optionGroup = array.map((e)=><Option value={e}>{e}</Option>);
        const optionGroup2 = [...array,...array2].map((e)=><Option value={e}>{e}</Option>);
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5},
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 19 },
            },
        };
        return(
            <Form>
                <FormItem
                    label="课程名："
                    {...formItemLayout}
                >
                    {getFieldDecorator('course_name', {
                        rules: [{
                            type: 'course_name', message: 'The input is not valid course_name!',
                        }, {
                            required: true, message: 'Please input the course_name!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="课程号："
                    {...formItemLayout}
                >
                    {getFieldDecorator('course_number', {
                        rules: [{
                            type: 'course_number', message: 'The input is not valid course_number!',
                        }, {
                            required: true, message: 'Please input the course_number!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="上课地点："
                    {...formItemLayout}
                >
                    {getFieldDecorator('address', {
                        rules: [{
                            type: 'address', message: 'The input is not valid address!',
                        }, {
                            required: true, message: 'Please input the address!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="上课时间："
                    {...formItemLayout}
                >
                    {getFieldDecorator('address', {
                        rules: [{
                            type: 'address', message: 'The input is not valid address!',
                        }, {
                            required: true, message: 'Please input the address!',
                        }],
                    })(
                        <div>
                            <Select style={{ width: '45%' }}>{optionGroup}</Select> -
                            &nbsp;<Select style={{ width: '45%' }}>{optionGroup}</Select>
                            &nbsp;节
                        </div>
                    )}
                </FormItem>
                <FormItem
                    label="上课周数："
                    {...formItemLayout}
                >
                    {getFieldDecorator('address', {
                        rules: [{
                            type: 'address', message: 'The input is not valid address!',
                        }, {
                            required: true, message: 'Please input the address!',
                        }],
                    })(
                        <div>
                            <Select style={{ width: '45%' }}>{optionGroup2}</Select> -
                            &nbsp;<Select style={{ width: '45%' }}>{optionGroup2}</Select>
                            &nbsp;周
                        </div>
                    )}
                </FormItem>
            </Form>
        )
    }
}

const CourseModal = Form.create()(CourseForm);
export default CourseModal;