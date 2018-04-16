import React,{Component} from 'react';
import {Button,Table,Input,Upload,Icon,message} from 'antd';
import '../../style/studentModal.scss';
import {CONFIG} from "../constants/conifg";

const {server} = CONFIG;


const Search = Input.Search;

class StudentModal extends Component{
    constructor(){
        super();
        this.state = {
            addShow:false,
            uploadShow:false,
            name:'',
            classInfo:'',
            num:''
        };
        this.addStudentHandler = this.addStudentHandler.bind(this);
        this.uploadHandler = this.uploadHandler.bind(this);
        this.addStudentHandler1 = this.addStudentHandler1.bind(this);
        this.uploadHandler1 = this.uploadHandler1.bind(this);
        this.addStudent = this.addStudent.bind(this);
        this.valueChange = this.valueChange.bind(this);
    }
    valueChange(e){
        const newState = {};
        newState[e.target.id] = e.target.value;
        console.log(newState);
        this.setState(newState);
    }
    addStudent(){
        const {name,classInfo,num} = this.state;
        const student = {
            name,
            classInfo,
            num
        };
        this.props.addStudent(student);
    }

    addStudentHandler(){
        this.setState({
            addShow:true,
            uploadShow:false
        })
    }
    uploadHandler(){
        this.setState({
            uploadShow:true,
            addShow:false,
        })
    }
    addStudentHandler1(){
        this.setState({
            addShow:false
        })
    }
    uploadHandler1(){
        this.setState({
            uploadShow:false
        })
    }

    render(){
        const columns = [{
            title: '姓名',
            dataIndex: 'name'
        }, {
            title: '学号',
            dataIndex: 'studentNum'
        }, {
            title: '班级',
            dataIndex: 'classInfo'
        },{
            title:'删除',
            dataIndex:'delete'
        }];
        const data = this.props.studentList.map((e)=>{
           return {
               key:e.id,
               ...e,
               delete:<Button type='danger'
                              onClick={()=>this.props.deleteStudent(e.id)}>删除</Button>
           };
        });
        const {_loadStudent,courseId} = this.props;
        const props = {
            name: 'file',
            action: server + `/course/${this.props.courseId}/student`,
            headers: {
                authorization: 'authorization-text',
            },
            withCredentials:true,
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done'&& info.file.response.status==='success') {
                    message.success(`${info.file.response.msg}`);
                    _loadStudent(courseId);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.response.msg}`);
                }
            },
        };
        return(
            <div>
                <div className="btn-content">
                    <Button type="primary" onClick={this.addStudentHandler}>增加学生</Button>
                    <Button type="primary" onClick={this.uploadHandler}>批量导入</Button>
                </div>
                {this.state.addShow&&<div className="add-content">
                    <a href="javascript:;" onClick={this.addStudentHandler1}><Icon type="close"/></a>
                    <div className="label-content">
                        <label htmlFor="name">
                            姓名：<Input id="name"
                                      style={{width:'100px'}}
                                      onChange={this.valueChange}/>
                        </label>
                        <label htmlFor="num">
                            学号：<Input id="num"
                                      style={{width:'100px'}}
                                      onChange={this.valueChange}/>
                        </label>
                        <label htmlFor="classInfo">
                            班级：<Input id="classInfo"
                                      style={{width:'100px'}}
                                      onChange={this.valueChange}/>
                        </label>
                    </div>
                    <div className="btn-content">
                        <Button type='primary'
                                onClick={this.addStudent}>增加</Button>
                    </div>
                </div>}
                {this.state.uploadShow&&<div className="upload-content">
                    <a href="javascript:;" onClick={this.uploadHandler1}><Icon type="close"/></a>
                    <Upload {...props}>
                        <Button>
                            <Icon type="upload" /> 导入
                        </Button>
                    </Upload>
                </div>}
                <div style={{marginBottom:20}}>
                    <Search
                        placeholder="input search text"
                        onSearch={value => {_loadStudent(courseId,value)}}
                        style={{ width: 300 }}
                        enterButton
                    />
                </div>
                <Table columns={columns} dataSource={data}/>
            </div>
        )
    }
}

export default StudentModal;