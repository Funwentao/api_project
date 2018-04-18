import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'antd';
import urlQuery from '../tool/urlQuery';
import fetch from 'isomorphic-fetch';
import {CONFIG} from "../constants/conifg";

const {server}  = CONFIG;

class NameForCall extends Component{
    constructor(){
        super();
        this.state = {
            studentList:[{
                name:"方文涛",
                studentNumber:2014150283
            }]
        };
        this._loadStudents = this._loadStudents.bind(this);
    }
    _loadStudents(){
        const {href} = location;
        const {courseId} = urlQuery(href);
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
    }
    render(){
        return(
            <div style={{textAlign:"center"}}>
                <div style={{marginBottom:20}}>
                    {
                        this.state.studentList.map((e)=>{
                            return <div key={e.studentNumber}>{e.name + "/" +e.studentNumber}</div>
                        })
                    }
                </div>
                <Button type="primary" size="large" onClick={this._loadStudents}>重新选10个学生</Button>
            </div>
        )
    }
}

ReactDOM.render(<NameForCall/>,document.getElementById("app"));