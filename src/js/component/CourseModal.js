import React,{Component} from 'react';
import {Form,Input,Select,Button,Col,Icon,message} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import fetch from 'isomorphic-fetch';
import {CONFIG} from "../constants/conifg";
const {server} = CONFIG;


class CourseForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            time:props.value.time||[],
            courseId:props.courseId||0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addTime = this.addTime.bind(this);
        this.removeTime = this.removeTime.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err){
                const tempArray = [];
                let obj = {
                    loc: values.address,
                    weekday: values.week_number,
                    start: values.start_class,
                    end: values.end_class
                };
                tempArray.push(obj);
                const {length} = this.state.time;
                for(let i = 1,j=2;i<length;i++){
                    let obj = {
                        loc: values["address"+j],
                        weekday: values["week_number"+j],
                        start: values["start_class"+j],
                        end: values["end_class"+j]
                    };
                    tempArray.push(obj);
                }
                let jsonObj = {
                    courseName:values.courseName,
                    courseNum:values.courseNum,
                    semester: values.semester,
                    startWeek: values.startWeek,
                    endWeek:values.endWeek,
                    time:tempArray,
                    courseId:this.state.courseId
                };
                const url = server + (this.state.courseId===0?'/course':'/course/'+this.state.courseId);
                fetch(url,{
                    method:this.state.courseId===0?'post':'put',
                    body:JSON.stringify(jsonObj),
                    mode: 'cors',
                    credentials:'include'
                }).then((res)=>{
                    return res.json()
                }).then((data)=>{
                    if(data.status === 'success'){
                        message.success(data.msg);
                        this.props.showModal();
                        this.props.loadData();
                    }else{
                        message.error(data.msg);
                    }
                })
            }
        });
    }
    addTime(){
        let time = [...this.state.time,{}];
        this.setState({
            time
        })
    }
    removeTime(i){
        let time = this.state.time;
        this.setState({
            time:[...time.slice(0,i),...time.slice(i+1)]
        });
    }
    componentWillReceiveProps(nextProps){
        if(this.props.value.courseId!==nextProps.value.courseId){
            this.setState({
                time:nextProps.value.time||[],
                courseId:nextProps.courseId||0
            });
        }
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const {value} = this.props;
        const time = this.state.time;
        const {courseName,courseNum,endWeek,startWeek,semester} = value;
        const week =['日','一','二','三','四','五','六'];
        const array = [1,2,3,4,5,6,7,8,9,10,11,12];
        const array2 = [13,14,15,16,17,18,19,20];
        const optionGroup = array.map((e)=><Option value={e} key={e}>{e}</Option>);
        const optionGroup2 = [...array,...array2].map((e)=><Option value={e} key={e}>{e}</Option>);
        const weekGroup = week.map((e,i)=><Option value={i} key={e}>{e}</Option>);
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
        var tiemArray = [];
        for(let i = 1,j=2;i < time.length;i++,j++){
            let a = "上课时间"+j+"：";
            let b = "week_number"+j;
            let c = "start_class"+j;
            let d = "end_class"+j;
            let e = "上课地点"+j;
            let f = "address"+j;
            let k1 = "key"+i;
            let k2 = "key2"+i;
            let timeItem = <FormItem key={k1}
                                     label={a}
                                     {...formItemLayout}
            >
                <Col span={3}>
                        <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                            星期
                        </span>
                </Col>
                <Col span={5}>
                    <FormItem >
                        {getFieldDecorator(b, {
                            initialValue:time[i]?time[i].weekday:1,
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
                            {getFieldDecorator(c, {
                                initialValue:time[i]?time[i].start:1,
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
                            {getFieldDecorator(d, {
                                initialValue:time[i]?time[i].end:2,
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
                    <a style={{ display: 'inline-block', width: '100%', textAlign: 'center',color:'#000' }} onClick={()=>this.removeTime(i)}>
                        <Icon type="minus-circle-o"/>
                    </a>
                </Col>
            </FormItem>;
            let addressItem = <FormItem
                key={k2}
                label={e}
                {...formItemLayout}
            >
                {getFieldDecorator(f, {
                    initialValue:time[i]?time[i].loc:'',
                    rules: [ {
                        required: true, message: 'Please input the address!',
                    }],
                })(
                    <Input />
                )}
            </FormItem>;
            tiemArray.push(timeItem,addressItem);
        }
        return(
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    label="课程名："
                    {...formItemLayout}
                >
                    {getFieldDecorator('courseName', {
                        initialValue:courseName||'',
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
                    {getFieldDecorator('courseNum', {
                        initialValue:courseNum||'',
                        rules: [{
                            required: true, message: 'Please input the course_number!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="学期"
                    {...formItemLayout}
                >
                    {getFieldDecorator('semester', {
                        initialValue:semester||'',
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
                    label="上课周数："
                    {...formItemLayout}
                >
                    <Col span={10}>
                        <FormItem >
                            {getFieldDecorator('startWeek', {
                                initialValue:startWeek||1,
                                rules: [ {
                                    required: true, message: 'Please select the startWeek!',
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
                            {getFieldDecorator('endWeek', {
                                initialValue:endWeek||20,
                                rules: [ {
                                    required: true, message: 'Please select the endWeek!',
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
                    label="上课时间1："
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
                                initialValue:time[0]?time[0].weekday:1,
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
                                    initialValue:time[0]?time[0].start:1,
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
                                    initialValue:time[0]?time[0].end:2,
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
                        <a style={{ display: 'inline-block', width: '100%', textAlign: 'center',color:'#000' }} onClick={this.addTime}>
                            <Icon type="plus-circle-o" />
                        </a>
                    </Col>
                </FormItem>
                <FormItem
                    label="上课地点1："
                    {...formItemLayout}
                >
                    {getFieldDecorator('address', {
                        initialValue:time[0]?time[0].loc:'',
                        rules: [ {
                            required: true, message: 'Please input the address!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                {
                    tiemArray
                }
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