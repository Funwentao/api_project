import React,{Component} from 'react';
import {Form,Input,Select,Button,Col,DatePicker } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

const {RangePicker }  = DatePicker;
class SemesterForm extends  Component{
    constructor(){
        super();
        const year = new Date().getFullYear();
        this.state = {
            startYear:year,
            endYear:year + 1
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.startYearChange = this.startYearChange.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(JSON.stringify(values));
        });
    }
    startYearChange(e){
        const year = parseInt(e.target.value) || 0;
        this.setState({
            startYear:year,
            endYear:year + 1
        })
    }
    render(){
        const { getFieldDecorator } = this.props.form;
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
        const {startYear,endYear} = this.state;
        return(
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    label="学年度："
                    {...formItemLayout}
                >
                    <Col span={10}>
                        <FormItem>
                            {getFieldDecorator('startYear', {
                                initialValue:startYear,
                                rules: [ {
                                    required: true, message: 'Please input the startYear!',
                                }],
                            })(
                                <Input onChange={this.startYearChange}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={2}>
                        <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                            -
                        </span>
                    </Col>
                    <Col span={10}>
                        <FormItem>
                            {getFieldDecorator('endYear', {
                                initialValue:endYear,
                                rules: [ {
                                    required: true, message: 'Please input the endYear!',
                                }],
                            })(
                                <Input  disabled/>
                            )}
                        </FormItem>
                    </Col>
                </FormItem>
                <FormItem
                    label="学期："
                    {...formItemLayout}
                >
                    {getFieldDecorator('semester', {
                        rules: [{
                            required: true, message: 'Please input the semester!',
                        }],
                    })(
                        <Select>
                            <Option value={0}>上学期</Option>
                            <Option value={1}>下学期</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    label="开始时间"
                    {...formItemLayout}
                >
                    {getFieldDecorator('date', {
                        rules: [{
                            required: true, message: 'Please input the date!',
                        }],
                    })(
                        <RangePicker/>
                    )}
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

const SemesterModal = Form.create()(SemesterForm);
export default SemesterModal;