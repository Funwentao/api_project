import React,{Component} from 'react';
import {Modal,message} from 'antd';
import Card from './Card';
import StudentModal from './StudentModal';
import fetch from 'isomorphic-fetch';
import {CONFIG} from "../constants/conifg"

const {server} = CONFIG;

class MyStudents extends Component{
    constructor(){
        super();
        this.state = {
            currentCourseList:[],
            historyCourseList:[],
            studentList:[],
            courseId:0
        };
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this._loadData = this._loadData.bind(this);
        this._loadStudent = this._loadStudent.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);
        this.addStudent = this.addStudent.bind(this);
    }
    _loadData(){
        const {server} = CONFIG;
        const url = server + '/course';
        fetch(url,{
            method:'get',
            mode: 'cors',
            credentials:'include'
        }).then((res) => {
            return res.json();
        }).then((data) =>{
            this.setState({
                currentCourseList:data.currentCourseList,
                historyCourseList:data.historyCourseList
            })
        });
    }
    componentDidMount(){
        this._loadData();
    }
    _loadStudent(id,num){
        const url = server + `/course/${id}/student`+ (num?`?num=${num}`:'');
        fetch(url,{
            method:'get',
            mode: 'cors',
            credentials:'include'
        }).then((res) => {
            return res.json();
        }).then((data) =>{
            this.setState({
                studentList:data.studentList,
                courseId:id
            })
        });
    }
    deleteStudent(studentId){
        const url = server + `/course/${this.state.courseId}/student/${studentId}`;
        fetch(url,{
            method:'delete',
            mode:'cors',
            credentials:'include'
        }).then((res) => {
            return res.json();
        }).then((data) =>{
            if(data.status==='success'){
                message.success(data.msg);
                this._loadStudent(this.state.courseId);
            }else{
                message.error(data.msg);
            }
        });
    }
    addStudent(student){
        const url = server + `/course/${this.state.courseId}/student`;
        console.log(student);
        if(Object.values(student).some((e)=>e==="")){
            message.error("信息未填写完整!");
            return;
        }
        fetch(url,{
            method:'post',
            mode:'cors',
            credentials:'include',
            body:JSON.stringify(student)
        }).then((res) => {
            return res.json();
        }).then((data) =>{
            if(data.status==='success'){
                message.success(data.msg);
                this._loadStudent(this.state.courseId);
            }else{
                message.error(data.msg);
            }
        });
    }
    showModal(id){
        this._loadStudent(id);
        this.setState({
            visible:true,
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
    render(){
        return(
            <div>
                <div>
                    <p>进行中的课程：</p>
                    <div style={{overflow:'hidden'}}>
                        {
                            this.state.currentCourseList.map((e)=> {
                                const className = 'color' + Math.ceil(Math.random()*10);
                                return <Card
                                    name={e.courseName}
                                    tips1="课程号"
                                    value1={e.courseNum}
                                    tips2="学生人数"
                                    value2={e.studentNum}
                                    className = {className}
                                    showModal = {this.showModal}
                                    key={e.courseId}
                                    id={e.courseId}
                                />
                            })
                        }
                    </div>
                </div>
                <div>
                    <p>已结束的课程：</p>
                    <div style={{overflow:'hidden'}}>
                        {
                            this.state.historyCourseList.map((e)=> {
                                const className = 'color' + Math.ceil(Math.random()*10);
                                return <Card
                                    name={e.courseName}
                                    tips1="课程号"
                                    value1={e.courseNum}
                                    tips2="学生人数"
                                    value2={e.studentNum}
                                    className = {className}
                                    showModal = {this.showModal}
                                    key={e.courseId}
                                />
                            })
                        }
                    </div>
                </div>
                <Modal title="学生详情"
                       visible={this.state.visible}
                       onOk={this.handleOk}
                       onCancel={this.handleCancel}>
                    <StudentModal studentList={this.state.studentList}
                                  deleteStudent={this.deleteStudent}
                                  addStudent ={this.addStudent}
                                  _loadStudent = {this._loadStudent}
                                  courseId={this.state.courseId}/>
                </Modal>
            </div>
        )
    }
}

export default MyStudents;