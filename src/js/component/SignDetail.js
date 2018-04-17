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
            week:0,
            modalType:'sign',
            timeList:[],
            time:0,
            visible:false
        };
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this._loadSign = this._loadSign.bind(this);
        this._loadStudent = this._loadStudent.bind(this);
        this.timeChange = this.timeChange.bind(this);
        this.createSign =this.createSign.bind(this);
        this.selectTime = this.selectTime.bind(this);
    }
    showModal(week,num){
        this._loadStudent(week,num);
        this.setState({
            visible:true,
            week
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
    _loadStudent(week,num){
        const {courseId} = this.props;
        const url = `${server}/course/${courseId}/sign/week/${week}${num?`?num=${num}`:``}`;
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
        const url = server + `/course/${courseId}/sign/week`;
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
    componentDidMount(){
       this._loadSign();
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
        const {courseId} = this.props;
        const url = `${server}/course/${courseId}/sign/${this.state.time}`;
        fetch(url,{
            method:'post',
            mode:'cors',
            credentials:'include',
        }).then(res=>{
            return res;
        }).then(data=>{
            if(data.status==='success'){
                this._loadSign();
                message.success(data.msg);
                this.setState({
                    visible:false
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
                        this.state.list.map((e)=> {
                            const className = 'color' + Math.ceil(Math.random()*10);
                            return <Card
                                name={`第${e.week}周`}
                                tips1="学生人数"
                                value1={e.amount}
                                tips2="签到成功"
                                value2={e.signedAmount}
                                className = {className}
                                showModal = {this.showModal}
                                id={e.week}
                                key={e.week}
                            />
                        })
                    }
                    <AddCard showModal={this.selectTime}/>
                </div>
                {
                    this.state.visible&&<Modal title="签到详情"
                                               visible={this.state.visible}
                                               onOk={this.handleOk}
                                               onCancel={this.handleCancel}>
                        {
                            this.state.modalType==='sign'&&<SignModal
                                courseId={this.props.courseId}
                                studentSignList={this.state.studentSignList}
                                week={this.state.week}
                                _loadStudent={this._loadStudent}/>
                        }
                        {
                            this.state.modalType==='selectTime'&&<div>
                                <Select onChange={this.timeChange}>
                                    {
                                        this.state.timeList.map((e)=>{
                                            return <Option key={e.Id}>{e.time}</Option>
                                        })
                                    }
                                </Select>
                                <Button type="primary" onClick={this.createSign}>确定</Button>
                            </div>
                        }
                    </Modal>
                }
            </div>

        )
    }
}

export default SignDetail;