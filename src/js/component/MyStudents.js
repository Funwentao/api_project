import React,{Component} from 'react';
import {Modal} from 'antd';
import Card from './Card';
import StudentModal from './StudentModal';

class MyStudents extends Component{
    constructor(){
        super();
        this.state = {
            course:[{
                name:'离散数学',
                tips1:'限选人数',
                value1:'50人',
                tips2:'学生人数',
                value2:'20人'
            }]
        };
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
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
                            this.state.course.map((e)=> {
                                const className = 'color' + Math.ceil(Math.random()*10);
                                return <Card
                                    name={e.name}
                                    tips1={e.tips1}
                                    value1={e.value1}
                                    tips2={e.tips2}
                                    value2={e.value2}
                                    className = {className}
                                    showModal = {this.showModal}
                                />
                            })
                        }
                    </div>
                </div>
                <div>
                    <p>已结束的课程：</p>
                    <div style={{overflow:'hidden'}}>
                        {
                            this.state.course.map((e)=> {
                                const className = 'color' + Math.ceil(Math.random()*10);
                                return <Card
                                    name={e.name}
                                    tips1={e.tips1}
                                    value1={e.value1}
                                    tips2={e.tips2}
                                    value2={e.value2}
                                    className = {className}
                                    showModal = {this.showModal}
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