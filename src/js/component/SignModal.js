import React,{Component} from 'react';
import {Button,Table,message,Switch,Input,Icon} from 'antd';
import '../../style/signModal.scss';

const Search = Input.Search;

class SignModal extends Component{
    constructor(){
        super();
        this.state={
          signState:[0,1,2,3]
        };
        this.teacherChangeSign = this.teacherChangeSign.bind(this);
        this.changeState = this.changeState.bind(this);
    }
    teacherChangeSign(){

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
            return this.state.signState.indexOf(e.state)!==-1
        }).map((e)=>{
           return {
               key:e.student_num,
               student_num:e.student_num,
               name:e.name,
               class_info:e.class_info,
               sign:<Switch defaultChecked={e.state===3}/>,
               time:e.state===0?'无':new Date(e.sign_time).toLocaleString()
           }
        });
        return(
            <div>
                <div className="btn-content">
                    <Button onClick={()=>this.changeState('all')}>全部</Button>
                    <Button type='primary' onClick={()=>this.changeState('success')}>成功</Button>
                    <Button type='danger' onClick={()=>this.changeState('failed')}>失败</Button>
                    <Button  type="primary" ghost style={{float:'right'}}>扫描签到</Button>
                    <Button type='primary' onClick={()=>this.props._loadStudent(this.props.week)}><Icon type="reload" /></Button>
                    <Button  type="danger" ghost style={{float:'right'}}>点名</Button>
                </div>
                <div style={{marginBottom:20}}>
                    <Search
                        placeholder="input search text"
                        onSearch={value => console.log(value)}
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