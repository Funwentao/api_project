import React,{Component} from 'react';
import {Input,Modal} from 'antd';
import Card from './Card';
import AddCard from './AddCard';
import CourseModal from './CourseModal';
import fetch from 'isomorphic-fetch';
import {CONFIG} from "../constants/conifg";

const Search = Input.Search;

class MyCourse extends Component{
    constructor(){
        super();
        this.state = {
            currentCourseList:[],
            historyCourseList:[],
            query:'',
            value:{}
        };
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this._loadData = this._loadData.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
    }
    showModal(id){
        let value = {};
        this.state.currentCourseList.forEach((e)=>{
            if(e.courseId===id){
                value = e;
            }
        });
        this.state.historyCourseList.forEach((e)=>{
            if(e.courseId===id){
                value = e;
            }
        });
        this.setState({
            visible:true,
            value,
        });
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
    deleteCard(){
        const {server} = CONFIG;
        const url = server + '/course';
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
    render(){
        return(
            <div>
                <div style={{textAlign:'center'}}>
                    <Search
                        placeholder="input search text"
                        onSearch={value => console.log(value)}
                        style={{ width: 300 }}
                        enterButton
                    />
                </div>
                <div>
                    <p>进行中的课程：</p>
                    <div style={{overflow:'hidden'}}>
                        {
                            this.state.currentCourseList.map((e)=> {
                                const className = 'color' + Math.ceil(Math.random()*10);
                                const obj = {
                                    1:"一",
                                    2:"二",
                                    3:"三",
                                    4:"四",
                                    5:"五",
                                };
                                const {time} = e;
                                const time1 = `星期${obj[time[0].weekday]} 第${time[0].start}节~第${time[0].end}节 `;
                                const loc = time[0].loc;
                                return <Card
                                    name={e.courseName}
                                    tips1="上课时间"
                                    value1={time1}
                                    tips2="上课地点"
                                    value2={loc}
                                    className = {className}
                                    visible={true}
                                    showModal = {this.showModal}
                                    id = {e.courseId}
                                    key = {e.courseId}
                                />
                            })
                        }
                        <AddCard showModal = {this.showModal}/>
                    </div>
                </div>
                <div>
                    <p>已结束的课程：</p>
                    <div style={{overflow:'hidden'}}>
                        {
                            this.state.historyCourseList.map((e)=> {
                                const className = 'color' + Math.ceil(Math.random()*10);
                                const obj = {
                                    1:"一",
                                    2:"二",
                                    3:"三",
                                    4:"四",
                                    5:"五",
                                };
                                const {time} = e;
                                const time1 = `星期${obj[time[0].weekday]} 第${time[0].start}节~第${time[0].end}节 `;
                                const loc = time[0].loc;
                                return <Card
                                    name={e.courseName}
                                    tips1="上课时间"
                                    value1={time1}
                                    tips2="上课地点"
                                    value2={loc}
                                    className = {className}
                                    visible={true}
                                    showModal = {this.showModal}
                                    id = {e.courseId}
                                    key = {e.courseId}
                                />
                            })
                        }
                    </div>
                </div>
                <Modal title="课程编辑"
                       visible={this.state.visible}
                       onOk={this.handleOk}
                       onCancel={this.handleCancel}>
                    <CourseModal value={this.state.value}/>
                </Modal>
            </div>
        )
    }
}

export default MyCourse;