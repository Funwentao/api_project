import React,{Component} from 'react';
import {Button,Table,Switch,Input,Icon} from 'antd';
import '../../style/signModal.scss';
import fetch from 'isomorphic-fetch';
import {CONFIG} from "../constants/conifg";

const {server,scanUrl,signUrl} = CONFIG;
const Search = Input.Search;

class SignModal extends Component{
    constructor(){
        super();
        this.state={
          signState:[0,1,2,3]
        };
        this.teacherChangeSign = this.teacherChangeSign.bind(this);
        this.changeState = this.changeState.bind(this);
        this.scanForSign = this.scanForSign.bind(this);
    }
    teacherChangeSign(id,value){
        const {courseId} = this.props;
        const url = `${server}/course/${courseId}/sign/${id}`;
        const state = value?'3':'2';
        const obj = {
            state
        };
        fetch(url,{
            method:'put',
            mode: 'cors',
            credentials:'include',
            body:JSON.stringify(obj)
        }).then(res=>{
            return res.json()
        }).then(data=>{
            if(data.status==='success'){
                const {_loadSign,_loadStudent,time,week} = this.props;
                _loadSign();
                _loadStudent(time,week);
            }
        })
    }
    changeState(string){
        let signState ;
        switch (string){
            case 'all': signState = [0,1,2,3];break;
            case 'success': signState = [3];break;
            case 'failed': signState = [0,1,2];break;
        }
        this.setState({
            signState
        })
    }
    scanForSign(string){
        const {time,week,courseId} = this.props;
        const url1 = `${scanUrl}?time=${time}&week=${week}&couseId=${courseId}`;
        const url2 = `${signUrl}?couseId=${courseId}`;
        string === 'scan'?window.open(url1):window.open(url2);
    }
    render(){
        const columns = [{
            title: '姓名',
            dataIndex: 'name'
        }, {
            title: '学号',
            dataIndex: 'student_num'
        }, {
            title: '班级',
            dataIndex: 'class_info'
        },{
            title:'签到',
            dataIndex:'sign'
        },{
            title:'签到时间',
            dataIndex:'time'
        }];
        const data = this.props.studentSignList.filter((e)=>{
            return this.state.signState.includes(e.state)
        }).map((e)=>{
           return {
               key:e.student_num,
               student_num:e.student_num,
               name:e.name,
               class_info:e.class_info,
               sign:<Switch defaultChecked={e.state===3}
                            onChange={(value)=>this.teacherChangeSign(e.id,value)}/>,
               time:e.state===0?'无':new Date(e.sign_time).toLocaleString()
           }
        });
        return(
            <div>
                <div className="btn-content">
                    <Button onClick={()=>this.changeState('all')}>全部</Button>
                    <Button type='primary' onClick={()=>this.changeState('success')}>成功</Button>
                    <Button type='danger' onClick={()=>this.changeState('failed')}>失败</Button>
                    <Button type='primary' onClick={()=>this.props.showModal(this.props.time)}><Icon type="reload" /></Button>
                    <Button  type="primary" ghost style={{float:'right'}} onClick={()=>this.scanForSign('scan')}>扫描签到</Button>
                    <Button  type="danger" ghost style={{float:'right'}} onClick={()=>this.scanForSign('sign')}>点名</Button>
                </div>
                <div style={{marginBottom:20}}>
                    <Search
                        placeholder="输入学号进行搜索"
                        onSearch={(num)=>this.props.showModal(this.props.time,num)}
                        style={{ width: 300 }}
                        enterButton
                    />
                </div>
                <Table columns={columns} dataSource={data}/>
            </div>
        )
    }
}

export default SignModal;