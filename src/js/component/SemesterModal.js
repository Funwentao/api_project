import React,{Component} from 'react';
import {Form,Input,Select,Button,Col,DatePicker,message} from 'antd';
import moment from 'moment';
import fetch from 'isomorphic-fetch';
import {CONFIG} from "../constants/conifg";
const FormItem = Form.Item;
const Option = Select.Option;
const {server} = CONFIG;


const {RangePicker}  = DatePicker;
class SemesterForm extends  Component{
    constructor(props){
        super(props);
        const {value} = props;
        //const year = value.startYear||new Date().getFullYear();
        this.state = {
            // startYear:year,
            // endYear:year + 1,
            // semesterId:value.semesterId||0
            ...value
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.startYearChange = this.startYearChange.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err){
                const {semesterId} = this.state;
                const url = server + (!semesterId?'/semester':'/semester/'+semesterId);
                fetch(url,{
                    method:!semesterId?'post':'put',
                    mode: 'cors',
                    credentials:'include',
                    body:JSON.stringify({...values,semesterId})
                }).then(res=>{
                    return res.json()
                }).then(data=>{
                    if(data.status==='success'){
                        message.success(data.msg);
                        this.props.showModal();
                        this.props.loadData();
                    }else{
                        message.error(data.msg);
                    }
                })
            }
        })

    }
    startYearChange(e){
        const startYear = parseInt(e.target.value) || 0;
        const endYear = startYear + 1;
        // let {value} = this.state;
        // value = {...value,startYear,endYear}
        this.setState({
            startYear,
            endYear
        })
    }
    // componentWillReceiveProps(nextProps){
    //     //console.log(this.props.value,nextProps.value);
    //     if(this.props.value.semesterId!==nextProps.value.semesterId){
    //        // const startYear = nextProps.value.startYear||new Date().getFullYear();
    //         this.forceUpdate();
    //         this.setState({
    //             // startYear:startYear,
    //             // endYear:startYear+1,
    //             // semesterId:nextProps.value.semesterId||0
    //             ...nextProps.value
    //         });
    //     }
    // }
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
        //const {startYear,endYear} = this.state;
        //const {value} = this.state;
        const {startYear,endYear,num,startTime,endTime} = this.state;
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
                        initialValue:num,
                        rules: [{
                            required: true, message: 'Please input the semester!',
                        }],
                    })(
                        <Select>
                            <Option value={1}>第一学期</Option>
                            <Option value={2}>第二学期</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    label="开始时间"
                    {...formItemLayout}
                >
                    {getFieldDecorator('date', {
                        initialValue:[moment(startTime), moment(endTime)],
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