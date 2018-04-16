import React,{Component} from 'react';
import {Modal} from 'antd';
import Card from './Card';
import StudentModal from './StudentModal';
import fetch from 'isomorphic-fetch';
import {CONFIG} from "../constants/conifg"

class MyStudents extends Component{
    constructor(){
        super();
        this.state = {
            currentCourseList:[],
            historyCourseList:[]
        };
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this._loadData = this._loadData.bind(this)
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
    showModal(){
        this.setState({
            visible:true
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
                    <StudentModal/>
                </Modal>
            </div>
        )
    }
}

export default MyStudents;