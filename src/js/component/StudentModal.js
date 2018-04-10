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
            dataIndex: 'number'
        }, {
            title: '班级',
            dataIndex: 'class'
        },{
            title:'删除',
            dataIndex:'delete'
        }];
        const data = [{
            key: '1',
            name: 'John Brown',
            number: 32,
            class: '计科1班',
            delete:<Button type='danger'>删除</Button>
        }, {
            key: '2',
            name: 'Jim Green',
            number: 42,
            class: '计科1班',
            delete:<Button type='danger'>删除</Button>
        }, {
            key: '3',
            name: 'Joe Black',
            number: 32,
            class: '计科1班',
            delete:<Button type='danger'>删除</Button>
        }, {
            key: '4',
            name: 'Disabled User',
            number: 99,
            class: '计科1班',
            delete:<Button type='danger'>删除</Button>
        }];
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
                    <a href="javascript:;" onClick={this.addStudentHandler1}>&times;</a>
                    <div className="label-content">
                        <label htmlFor="name">
                            姓名：<Input id="name" style={{width:'100px'}}/>
                        </label>
                        <label htmlFor="number">
                            学号：<Input id="number" style={{width:'100px'}}/>
                        </label>
                        <label htmlFor="class">
                            班级：<Input id="class" style={{width:'100px'}}/>
                        </label>
                    </div>
                    <div className="btn-content">
                        <Button type='primary'>增加</Button>
                    </div>
                </div>}
                {this.state.uploadShow&&<div className="upload-content">
                    <a href="javascript:;" onClick={this.uploadHandler1}>&times;</a>
                    <Upload {...props}>
                        <Button>
                            <Icon type="upload" /> 导入
                        </Button>
                    </Upload>
                </div>}
                <div style={{textAlign:'right',marginBottom:20}}>
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