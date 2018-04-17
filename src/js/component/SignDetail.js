import React,{Component} from 'react';
import {Modal,Icon,Select,Button,message} from 'antd';
import Card from './Card';
import SignModal from './SignModal';
import AddCard from './AddCard';
import fetch from 'isomorphic-fetch';
import {CONFIG} from "../constants/conifg";

const {server} = CONFIG;
const {Option} = Select;

class SignDetail extends Component{
    constructor(){
        super();
        this.state = {
            list:[],
            studentSignList:[],
            modalType:'sign',
            timeList:[],
            visible:false,
            time:0
        };
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this._loadSign = this._loadSign.bind(this);
        this._loadStudent = this._loadStudent.bind(this);
        this.timeChange = this.timeChange.bind(this);
        this.createSign =this.createSign.bind(this);
        this.selectTime = this.selectTime.bind(this);
        this._loadTime = this._loadTime.bind(this);
    }
    showModal(time,num){
        let week = 0;
        this.state.list.forEach((e)=>{
            if(e.courseTimeId === time){
                week = e.week;
            }
        });
        this._loadStudent(time,week,num);
        this.setState({
            visible:true,
            time
        })
    }
    handleCancel(){
        this.setState({
            visible:false
        })
    }
    handleOk(){
        this.setState({
            visible:false
        })
    }
    _loadStudent(time,week,num){
        const {courseId} = this.props;
        const url = `${server}/course/${courseId}/sign?time=${time}&week=${week}${num?`&num=${num}`:``}`;
        console.log(url);
        fetch(url,{
            method:'get',
            mode:'cors',
            credentials:'include'
        }).then((res) => {
            return res.json();
        }).then((data) =>{
            this.setState({
                studentSignList:data.list
            })
        });
    }
    _loadSign(){
        const {courseId} = this.props;
        const url = server + `/course/${courseId}/sign`;
        fetch(url,{
            method:'get',
            mode:'cors',
            credentials:'include'
        }).then((res) => {
            return res.json();
        }).then((data) =>{
            this.setState({
                list:data.list
            })
        });
    }
    _loadTime(){
        const {courseId} = this.props;
        const url = server + `/course/${courseId}/time`;
        fetch(url,{
            method:'get',
            mode:'cors',
            credentials:'include'
        }).then((res) => {
            return res.json();
        }).then((data) =>{
            this.setState({
                timeList:data.list
            })
        });
    }
    componentDidMount(){
       this._loadSign();
       this._loadTime();
    }
    selectTime(){
        this.setState({
            modalType:'selectTime',
            visible:true
        })
    }
    timeChange(value){
        this.setState({
            time:value
        })
    }
    createSign(){
        const {time} = this.state;
        if(time===0){
            message.error("还未选择时间");
            return;
        }
        const {courseId} = this.props;
        const url = `${server}/course/${courseId}/sign`;
        const obj = {
            courseTimeId:time
        };
        fetch(url,{
            method:'post',
            mode:'cors',
            credentials:'include',
            body:JSON.stringify(obj)
        }).then(res=>{
            return res.json();
        }).then(data=>{
            console.log(data);
            if(data.status==='success'){
                this._loadSign();
                message.success(data.msg);
                this.setState({
                    visible:false,
                    modalType:'sign'
                })
            }else{
                message.error(data.msg);
            }
        })
    }
    render(){
        return(
            <div>
                <div style={{marginBottom:10}}>
                    <a href="javascript:;" onClick={this.props.toggleSignDetail} style={{fontSize:24}}><Icon type="arrow-left" /></a>
                </div>
                <div style={{overflow:'hidden'}}>
                    {
                        this.state.list.map((e,i)=> {
                            const className = 'color' + Math.ceil(Math.random()*10);
                            return <Card
                                name={`第${e.week}周`}
                                tips1="学生人数"
                                value1={e.amount}
                                tips2="签到成功"
                                value2={e.signedAmount}
                                className = {className}
                                showModal = {this.showModal}
                                id={e.courseTimeId}
                                key={i}
                            />
                        })
                    }
                    <AddCard showModal={this.selectTime}/>
                </div>
                {
                    this.state.visible&&<Modal title={this.state.modalType==='sign'?'签到详情':'选择时间'}
                                               visible={this.state.visible}
                                               onOk={this.handleOk}
                                               onCancel={this.handleCancel}>
                        {
                            this.state.modalType==='sign'&&<SignModal
                                courseId={this.props.courseId}
                                studentSignList={this.state.studentSignList}
                                week={this.state.week}
                                _loadSign={this._loadSign}
                                showModal = {this.showModal}
                                time = {this.state.time}
                                _loadStudent={this._loadStudent}/>
                        }
                        {
                            this.state.modalType==='selectTime'&&<div style={{textAlign:'center'}}>
                                <Select onChange={this.timeChange} style={{width:'60%',marginBottom:20}}>
                                    {
                                        this.state.timeList.map((e)=>{
                                            return <Option key={e.id} value={e.id}>{`周 ${e.courseWeekday} ${e.courseSectionStart}~${e.courseSectionEnd} 节`}</Option>
                                        })
                                    }
                                </Select>
                                <Button type="primary" style={{width:'60%'}} onClick={this.createSign}>创建签到</Button>
                            </div>
                        }
                    </Modal>
                }
            </div>

        )
    }
}

export default SignDetail;