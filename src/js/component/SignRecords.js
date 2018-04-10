import React,{Component} from 'react';
import {Modal} from 'antd';
import SignModal from './SignModal';
import Card from './Card';

class SignRecords extends Component{
    constructor() {
        super();
        this.state = {
            course: [{
                name: '离散数学',
                tips1: '学年度',
                value1: '2017-2018年上学期',
                tips2: '学生人数',
                value2: '20人'
            }]
        };
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
                                    showModal = {this.props.toggleSignDetail}
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
                                    showModal = {this.props.toggleSignDetail}
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