import React,{Component} from 'react';
import {Form,Input,Select,Button,Col,Icon} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class CourseForm extends  Component{
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values);
        });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const week =['日','一','二','三','四','五','六'];
        const array = [1,2,3,4,5,6,7,8,9,10,11,12];
        const array2 = [13,14,15,16,17,18,19,20];
        const optionGroup = array.map((e)=><Option value={e}>{e}</Option>);
        const optionGroup2 = [...array,...array2].map((e)=><Option value={e}>{e}</Option>);
        const weekGroup = week.map((e,i)=><Option value={i}>{e}</Option>)
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
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    label="课程名："
                    {...formItemLayout}
                >
                    {getFieldDecorator('course_name', {
                        rules: [ {
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
                            required: true, message: 'Please input the course_number!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="学年度"
                    {...formItemLayout}
                >
                    {getFieldDecorator('year', {
                        rules: [{
                            required: true, message: 'Please input the year!',
                        }],
                    })(
                        <Select>
                            <Option value='2017-2018'>2017-2018</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    label="上课地点："
                    {...formItemLayout}
                >
                    {getFieldDecorator('address', {
                        rules: [ {
                            required: true, message: 'Please input the address!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="上课周数："
                    {...formItemLayout}
                >
                    <Col span={10}>
                        <FormItem >
                            {getFieldDecorator('start_week', {
                                rules: [ {
                                    required: true, message: 'Please select the start_week!',
                                }],
                            })(
                                <Select>{optionGroup2}</Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={2}>
                        <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                            -
                        </span>
                    </Col>
                    <Col span={10}>
                        <FormItem >
                            {getFieldDecorator('end_week', {
                                rules: [ {
                                    required: true, message: 'Please select the end_week!',
                                }],
                            })(
                                <Select>{optionGroup2}</Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={2}>
                        <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                            周
                        </span>
                    </Col>
                </FormItem>
                <FormItem
                    label="上课时间："
                    {...formItemLayout}
                >
                    <Col span={3}>
                        <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                            星期
                        </span>
                    </Col>
                    <Col span={5}>
                        <FormItem >
                            {getFieldDecorator('week_number', {
                                rules: [ {
                                    required: true, message: 'Please select the week_number!',
                                }],
                            })(
                                <Select>{weekGroup}</Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={1}>
                        <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                            &nbsp;
                        </span>
                    </Col>
                    <Col span={5}>
                        <FormItem >
                            <FormItem >
                                {getFieldDecorator('start_class', {
                                    rules: [ {
                                        required: true, message: 'Please select the start_class!',
                                    }],
                                })(
                                    <Select>{optionGroup}</Select>
                                )}
                            </FormItem>
                        </FormItem>
                    </Col>
                    <Col span={1}>
                        <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                            -
                        </span>
                    </Col>
                    <Col span={5}>
                        <FormItem >
                            <FormItem >
                                {getFieldDecorator('end_class', {
                                    rules: [ {
                                        required: true, message: 'Please select the end_class!',
                                    }],
                                })(
                                    <Select>{optionGroup}</Select>
                                )}
                            </FormItem>
                        </FormItem>
                    </Col>
                    <Col span={2}>
                        <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                            节
                        </span>
                    </Col>
                    <Col span={2}>
                        <a style={{ display: 'inline-block', width: '100%', textAlign: 'center',color:'#000' }}>
                            <Icon type="plus"/>
                        </a>
                    </Col>
                </FormItem>
                <FormItem style={{textAlign:'center'}}>
                    <Button type="primary" htmlType="submit" style={{width:'80%'}}>
                        提交
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

const CourseModal = Form.create()(CourseForm);
export default CourseModal;