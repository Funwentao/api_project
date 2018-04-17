import React,{Component} from 'react';
import Card from './Card';
import {CONFIG} from "../constants/conifg";

const {server} = CONFIG;

class SignRecords extends Component{
    constructor() {
        super();
        this.state = {
            currentCourseList:[],
            historyCourseList:[]
        };
    }
    _loadData(){
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
                                    tips1="学期"
                                    value1={e.semester}
                                    tips2="学生人数"
                                    value2={e.studentAmount}
                                    className = {className}
                                    showModal = {this.props.toggleSignDetail}
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
                                    tips1="学期"
                                    value1={e.semester}
                                    tips2="学生人数"
                                    value2={e.studentNum}
                                    className = {className}
                                    showModal = {this.props.toggleSignDetail}
                                    key={e.courseId}
                                />
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default SignRecords;