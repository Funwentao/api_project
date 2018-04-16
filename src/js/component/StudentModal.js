import React,{Component} from 'react';
import {Button,Table,Input,Upload,Icon,message} from 'antd';
import '../../style/studentModal.scss';

const Search = Input.Search;

class StudentModal extends Component{
    constructor(){
        super();
        this.state = {
            addShow:false,
            uploadShow:false
        };
        this.addStudentHandler = this.addStudentHandler.bind(this);
        this.uploadHandler = this.uploadHandler.bind(this);
        this.addStudentHandler1 = this.addStudentHandler1.bind(this);
        this.uploadHandler1 = this.uploadHandler1.bind(this);
        this.addStudent = this.addStudent.bind(this);
    }
    addStudent(){
        const student = {
            name:this.name.value,
            classInfo:this.classInfo.value,
            num:this.num.value
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
        // const data = [{
        //     key: '1',
        //     name: 'John Brown',
        //     number: 32,
        //     class: '计科1班',
        //     delete:<Button type='danger'>删除</Button>
        // }];
        const props = {
            name: 'file',
            action: '//jsonplaceholder.typicode.com/posts/',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
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
                    <a href="javascript:;" onClick={this.addStudent}><Icon type="close"/></a>
                    <div className="label-content">
                        <label htmlFor="name">
                            姓名：<Input id="name"
                                      style={{width:'100px'}}
                                      ref={(name)=>this.name = name}/>
                        </label>
                        <label htmlFor="number">
                            学号：<Input id="number"
                                      style={{width:'100px'}}
                                      ref={(num)=>this.num = num}/>
                        </label>
                        <label htmlFor="class">
                            班级：<Input id="class"
                                      style={{width:'100px'}}
                                      ref={(classInfo)=>this.classInfo = classInfo}/>
                        </label>
                    </div>
                    <div className="btn-content">
                        <Button type='primary'
                                addStudent={this.addStudentHandler}>增加</Button>
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

export default StudentModal;