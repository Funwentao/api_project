import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Button,Icon,message} from 'antd';
import urlQuery from '../tool/urlQuery';
import fetch from 'isomorphic-fetch';
import {CONFIG} from "../constants/conifg";
import StudentCard from '../component/StudentCard';
import "../../style/call.scss"

const {href} = location;
const {courseId,week,time} = urlQuery(href);
const {server}  = CONFIG;

class NameForCall extends Component{
    constructor(){
        super();
        this.state = {
            left:20,
            studentList:[]
        };
        this._loadStudents = this._loadStudents.bind(this);
        this.move = this.move.bind(this);
    }
    teacherChangeSign(id,value){
        const url = `${server}/course/${courseId}/sign/${id}`;
        const state = value!==3?3:2;
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
            let {studentList} = this.state;
            let index = 0;
            studentList.forEach((e,i)=>{
                if(e.id===id){
                    index = i;
                }
            });
            const obj = {...studentList[index],state:value!==3?3:2};
            studentList = [...studentList.slice(0,index),obj,...studentList.slice(index+1)];
            if(data.status==='success'){
                this.setState({
                    studentList
                })
            }
        })
    }
    _loadStudents(){
        const url = `${server}/course/${courseId}/sign?time=${time}&week=${week}&amount=10`;
        fetch(url,{
            method:'get',
            mode:'cors',
            credentials:'include'
        }).then((res) => {
            return res.json();
        }).then((data) =>{
            this.setState({
                studentList:data.list
            })
        });
    }
    componentDidMount(){
        this._loadStudents();
        document.onkeyup=(e)=>{
            switch (e.keyCode){
                case 39:this.move(-13);break;
                case 37:this.move(13);break;
                default:break;
            }
        }
    }
    move(value){
        let {left} = this.state;
        if(value>0){
            if(left===20){
                message.info("已经是第一个学生了");
                return;
            }
        }else{
            if(left===-4660){
                message.info("已经是最后一个学生了");
                return;
            }
        }
        let width = 520;
        const clearId = setInterval(()=>{
            if(width>0){
                this.setState({
                    left:this.state.left + value
                });
                width -= 13;
            }else{
                clearInterval(clearId);
            }
        },10);
    }
    render(){
        const {left} = this.state;
        return(
            <div className="container">
                <div className="slider-container">
                    <a href="javascript:;" className="left-button" onClick={()=>this.move(13)}><Icon type="left" /></a>
                    <a href="javascript:;" className="right-button" onClick={()=>this.move(-13)}><Icon type="right" /></a>
                    <div className="slider">
                        <div className="card-container" style={{left:left}}>
                            {
                                this.state.studentList.map((e)=>{
                                    const i = Math.ceil(Math.random()*10);
                                    const color = `color${i}`;
                                    return <StudentCard name={e.name}
                                                        color = {color}
                                                        studentNumber={e.student_num}
                                                        sign={e.state}
                                                        teacherChangeSign={()=>this.teacherChangeSign(e.id,e.state)}
                                                        key={e.student_num}/>
                                })
                            }
                        </div>
                    </div>
                </div>
                <Button type="primary" size="large" onClick={this._loadStudents}>重新选10个学生</Button>
            </div>
        )
    }
}

ReactDOM.render(<NameForCall/>,document.getElementById("app"));