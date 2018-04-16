import React,{Component} from 'react';
import {Modal,message} from 'antd';
import SemesterModal from './SemesterModal';
import Card from './Card';
import AddCard from './AddCard';
import fetch from 'isomorphic-fetch';
import {CONFIG} from "../constants/conifg";

class SemesterManagement extends Component{
    constructor(){
        super();
        this.state = {
            semesterList:[],
            value:{}
        };
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this._loadData = this._loadData.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
    }
    showModal(semesterId){
        let value = {};
        this.state.semesterList.forEach((e,i)=>{
           if(e.semesterId === semesterId){
               value = this.state.semesterList[i];
           }
        });
        this.setState({
            visible:true,
            value
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
    _loadData(){
        const {server} = CONFIG;
        const url = server + '/semester';
        fetch(url,{
            method:'get',
            mode: 'cors',
            credentials:'include'
        }).then(res=>{
            return res.json()
        }).then(data=>{
            this.setState({
                semesterList:data.semesterList
            })
        });

    }
    deleteCard(){
        const {server} = CONFIG;
        const url = server + '/semester/' + this.state.value.semesterId;
        fetch(url,{
            method:'delete',
            mode:'cors',
            credentials:'include'
        }).then(res=>{
            return res.json()
        }).then(data=>{
            if(data.status===1){
                message.success(data.msg);
            }else{
                message.error(data.msg);
            }
            this._loadData();
        })
    }
    componentDidMount(){
        this._loadData();
    }
    render(){
        return(
            <div>
                <div>
                    <div style={{overflow:'hidden'}}>
                        {
                            this.state.semesterList.map((e)=> {
                                const className = 'color' + Math.ceil(Math.random()*10);
                                const startTime = new Date(e.startTime).toLocaleDateString();
                                const endTime = new Date(e.endTime).toLocaleDateString();
                                return <Card
                                    name={e.semesterName}
                                    tips1='开始时间'
                                    value1={startTime}
                                    tips2='结束时间'
                                    value2={endTime}
                                    className = {className}
                                    visible = {true}
                                    showModal = {this.showModal}
                                    key = {e.semesterId}
                                    id = {e.semesterId}
                                />
                            })
                        }
                        <AddCard showModal = {this.showModal}/>
                    </div>
                </div>
                <Modal title="学期编辑"
                       visible={this.state.visible}
                       onOk={this.handleOk}
                       onCancel={this.handleCancel}>
                    <SemesterModal value={this.state.value}
                                   showModal = {this.showModal}
                                   loadData={this._loadData}/>
                </Modal>
            </div>
        )
    }
}

export default SemesterManagement;