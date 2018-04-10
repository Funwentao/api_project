import React,{Component} from 'react';
import {Input,Modal} from 'antd';
import Card from './Card';
import AddCard from './AddCard';
import CourseModal from './CourseModal';

const Search = Input.Search;

class MyCourse extends Component{
    constructor(){
        super();
        this.state = {
            course:[{
                name:'离散数学',
                tips1:'上课时间',
                value1:'4-5节',
                tips2:'上课地点',
                value2:'教学楼304'
            }]
        }
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
                            this.state.course.map((e)=> {
                                const className = 'color' + Math.ceil(Math.random()*10);
                                return <Card
                                    name={e.name}
                                    tips1={e.tips1}
                                    value1={e.value1}
                                    tips2={e.tips2}
                                    value2={e.value2}
                                    className = {className}
                                    visible={true}
                                    showModal = {this.showModal}
                                />
                            })
                        }
                        <AddCard/>
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
                                    visible={false}
                                    showModal = {this.showModal}
                                />
                            })
                        }
                    </div>
                </div>
                <Modal title="Basic Modal"
                       visible={this.state.visible}
                       onOk={this.handleOk}
                       onCancel={this.handleCancel}>
                    <CourseModal/>
                </Modal>
            </div>
        )
    }
}

export default MyCourse;