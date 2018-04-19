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
            studentList:[{
                name:"方文涛",
                studentNumber:2014150283,
                sign:'success'
            },{
                name:"方文涛",
                studentNumber:2014150281
            },{
                name:"方文涛",
                studentNumber:2014150282
            },{
                name:"方文涛",
                studentNumber:2014150280
            },{
                name:"方文涛",
                studentNumber:2014150284
            },{
                name:"方文涛",
                studentNumber:2014150285
            },{
                name:"方文涛",
                studentNumber:2014150286
            },{
                name:"方文涛",
                studentNumber:2014150287
            },{
                name:"方文涛",
                studentNumber:2014150288
            },{
                name:"方文涛",
                studentNumber:2014150289
            }]
        };
        this._loadStudents = this._loadStudents.bind(this);
        this.move = this.move.bind(this);
    }
    _loadStudents(){
        const url = `${server}/courseId/${courseId}/student`;
        fetch(url,{
            method:'get',
            mode:'cors',
            credentials:'include'
        }).then(res=>{
            return res.json()
        }).then(data=>{
            this.setState({
                studentList:data.studentList
            })
        })
    }
    componentDidMount(){
        //this._loadStudents();
        document.onkeyup=(e)=>{
            console.log(e);
            switch (e.keyCode){
                case 39:this.move(13);break;
                case 37:this.move(-13);break;
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
                    <a href="javascript:;" className="left-button" onClick={()=>this.move(-13)}><Icon type="left" /></a>
                    <a href="javascript:;" className="right-button" onClick={()=>this.move(13)}><Icon type="right" /></a>
                    <div className="slider">
                        <div className="card-container" style={{left:left}}>
                            {
                                this.state.studentList.map((e)=>{
                                    const i = Math.ceil(Math.random()*10);
                                    const color = `color${i}`;
                                    return <StudentCard name={e.name}
                                                        color = {color}
                                                        studentNumber={e.studentNumber}
                                                        sign={e.sign}
                                                        key={e.studentNumber}/>
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